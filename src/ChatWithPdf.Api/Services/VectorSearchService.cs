using ChatWithPdf.Api.Data;
using ChatWithPdf.Api.Models;
using Microsoft.EntityFrameworkCore;
using Pgvector;
using Pgvector.EntityFrameworkCore;

namespace ChatWithPdf.Api.Services;

public class VectorSearchService : IVectorSearchService
{
    private readonly AppDbContext _db;

    public VectorSearchService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<VectorSearchResult>> SearchAsync(
        Guid documentId,
        float[] embedding,
        int limit = 5,
        CancellationToken cancellationToken = default)
    {
        var queryVector = new Vector(embedding);

        var chunks = await _db.DocumentChunks
            .Where(x =>
                x.DocumentId == documentId &&
                x.Embedding != null)
            .OrderBy(x =>
                x.Embedding!.CosineDistance(queryVector))
            .Take(limit)
            .ToListAsync(cancellationToken);

        return chunks
            .Select(chunk =>
            {
                var distance =
                    chunk.Embedding!
                        .CosineDistance(queryVector);

                var score = 1 - distance;

                return new VectorSearchResult(
                    chunk,
                    score);
            })
            .ToList();
    }
}