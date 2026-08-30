using ChatWithPdf.Api.Models;

namespace ChatWithPdf.Api.Services;

public interface IVectorSearchService
{
    Task<List<VectorSearchResult>> SearchAsync(
        Guid documentId,
        float[] embedding,
        int limit = 5,
        CancellationToken cancellationToken = default);
}

public record VectorSearchResult(
    DocumentChunk Chunk,
    double Score
);