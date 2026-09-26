using ChatWithPdf.Api.Data;
using ChatWithPdf.Api.DTOs;
using ChatWithPdf.Api.Models;
using ChatWithPdf.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pgvector;

namespace ChatWithPdf.Api.Controllers;

[ApiController]
[Route("api/documents")]
public class DocumentsController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IPdfService _pdfService;
    private readonly IEmbeddingService _embeddingService;

    public DocumentsController(
        AppDbContext db,
        IPdfService pdfService,
        IEmbeddingService embeddingService)
    {
        _db = db;
        _pdfService = pdfService;
        _embeddingService = embeddingService;
    }

    [HttpPost]
    [RequestSizeLimit(50_000_000)]
    public async Task<ActionResult<DocumentDto>> Upload(
        IFormFile file,
        CancellationToken cancellationToken)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(
                new
                {
                    message = "PDF file is required."
                });
        }

        if (!string.Equals(
                file.ContentType,
                "application/pdf",
                StringComparison.OrdinalIgnoreCase))
        {
            return BadRequest(
                new
                {
                    message = "Only PDF files are supported."
                });
        }

        var document = new Document
        {
            Id = Guid.NewGuid(),
            FileName = file.FileName,
            Status = "Processing",
            CreatedAt = DateTime.UtcNow
        };

        _db.Documents.Add(document);

        await _db.SaveChangesAsync(
            cancellationToken);

        try
        {
            await using var stream =
                file.OpenReadStream();

            var pages =
                await _pdfService.ExtractTextAsync(
                    stream);

            var chunks = new List<DocumentChunk>();

            foreach (var page in pages)
            {
                var pageChunks =
                    TextChunker.Chunk(page.Text);

                for (var i = 0;
                     i < pageChunks.Count;
                     i++)
                {
                    var content =
                        pageChunks[i];

                    //var embedding =
                    //    await _embeddingService
                    //        .CreateEmbeddingAsync(
                    //            content,
                    //            cancellationToken);

                    chunks.Add(
                        new DocumentChunk
                        {
                            Id = Guid.NewGuid(),
                            DocumentId = document.Id,
                            ChunkIndex = i,
                            PageNumber = page.PageNumber,
                            Content = content,
                            //Embedding = new Vector(
                            //    embedding),
                            TokenCount = content.Length
                        });
                }
            }

            _db.DocumentChunks.AddRange(chunks);

            document.Status = "Ready";

            await _db.SaveChangesAsync(
                cancellationToken);

            return Ok(
                new DocumentDto(
                    document.Id,
                    document.FileName,
                    document.Status,
                    document.CreatedAt
                )
            );
        }
        catch
        {
            document.Status = "Failed";

            await _db.SaveChangesAsync(
                cancellationToken);

            throw;
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<DocumentDto>>>
        GetDocuments(
            CancellationToken cancellationToken)
    {
        var documents =
            await _db.Documents
                .OrderByDescending(x => x.CreatedAt)
                .Select(x =>
                    new DocumentDto(
                        x.Id,
                        x.FileName,
                        x.Status,
                        x.CreatedAt
                    ))
                .ToListAsync(
                    cancellationToken);

        return Ok(documents);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<DocumentDto>>
        GetDocument(
            Guid id,
            CancellationToken cancellationToken)
    {
        var document =
            await _db.Documents
                .FirstOrDefaultAsync(
                    x => x.Id == id,
                    cancellationToken);

        if (document == null)
            return NotFound();

        return Ok(
            new DocumentDto(
                document.Id,
                document.FileName,
                document.Status,
                document.CreatedAt
            )
        );
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(
        Guid id,
        CancellationToken cancellationToken)
    {
        var document =
            await _db.Documents
                .FirstOrDefaultAsync(
                    x => x.Id == id,
                    cancellationToken);

        if (document == null)
            return NotFound();

        _db.Documents.Remove(document);

        await _db.SaveChangesAsync(
            cancellationToken);

        return NoContent();
    }

    [HttpGet("{id}/chunks")]
    public async Task<ActionResult<List<DocumentChunkDto>>> GetChunks(
    Guid id,
    CancellationToken cancellationToken)
    {
        var documentExists = await _db.Documents
            .AnyAsync(
                x => x.Id == id,
                cancellationToken);

        if (!documentExists)
        {
            return NotFound(
                new
                {
                    message = "Document not found."
                });
        }

        var chunks = await _db.DocumentChunks
            .Where(x => x.DocumentId == id)
            .OrderBy(x => x.ChunkIndex)
            .Select(x => new DocumentChunkDto(
                x.Id,
                x.ChunkIndex,
                x.PageNumber,
                x.Content,
                x.TokenCount
            ))
            .ToListAsync(cancellationToken);

        return Ok(chunks);
    }
}