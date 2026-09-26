using ChatWithPdf.Api.Data;
using ChatWithPdf.Api.DTOs;
using ChatWithPdf.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChatWithPdf.Api.Models;
namespace ChatWithPdf.Api.Controllers;

[ApiController]
[Route("api/chat")]
public class ChatController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IEmbeddingService _embeddingService;
    private readonly IVectorSearchService _vectorSearch;
    private readonly IChatService _chatService;

    public ChatController(
        AppDbContext db,
        IEmbeddingService embeddingService,
        IVectorSearchService vectorSearch,
        IChatService chatService)
    {
        _db = db;
        _embeddingService = embeddingService;
        _vectorSearch = vectorSearch;
        _chatService = chatService;
    }

    [HttpPost]
    public async Task<ActionResult<AskQuestionResponse>>
        Ask(
            AskQuestionRequest request,
            CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(
                request.Question))
        {
            return BadRequest(
                new
                {
                    message = "Question is required."
                });
        }

        var documentExists =
            await _db.Documents.AnyAsync(
                x =>
                    x.Id == request.DocumentId &&
                    x.Status == "Ready",
                cancellationToken);

        if (!documentExists)
        {
            return NotFound(
                new
                {
                    message =
                        "Document was not found or is not ready."
                });
        }

        //var questionEmbedding =
        //    await _embeddingService
        //        .CreateEmbeddingAsync(
        //            request.Question,
        //            cancellationToken);

        //var results =
        //    await _vectorSearch.SearchAsync(
        //        request.DocumentId,
        //        questionEmbedding,
        //        5,
        //        cancellationToken);
        var newresults = await _db.DocumentChunks
    .Where(x => x.DocumentId == request.DocumentId)
    .OrderBy(x => x.ChunkIndex)
    .Take(5)
    .ToListAsync(cancellationToken);
        var context = string.Join(
    "\n\n--- CHUNK ---\n\n",
    newresults.Select(x => x.Content));
        if (newresults.Count == 0)
        {
            return Ok(
                new AskQuestionResponse(
                    "I couldn't find relevant information in the document.",
                    new List<SourceDto>()
                )
            );
        }


        var results = newresults.Select(x => new VectorSearchResult(x, 0)).ToList();
        //var answer =
        //    await _chatService.GenerateAnswerAsync(
        //        request.Question,
        //        results,
        //        cancellationToken);

        var sources =
            results
                .Select(result =>
                    new SourceDto(
                        result.Chunk.Id,
                        result.Chunk.DocumentId,
                        result.Chunk.PageNumber,
                        result.Chunk.Content,
                        result.Score
                    ))
                .ToList();

        return Ok(
            new AskQuestionResponse(
                "answer",
                sources
            )
        );
    }
}