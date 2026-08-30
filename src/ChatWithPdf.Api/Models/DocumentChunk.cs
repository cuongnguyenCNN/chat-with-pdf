using Pgvector;

namespace ChatWithPdf.Api.Models;

public class DocumentChunk
{
    public Guid Id { get; set; }

    public Guid DocumentId { get; set; }

    public Document Document { get; set; } = null!;

    public int ChunkIndex { get; set; }

    public int? PageNumber { get; set; }

    public string Content { get; set; } = string.Empty;

    public Vector? Embedding { get; set; }

    public int TokenCount { get; set; }
}