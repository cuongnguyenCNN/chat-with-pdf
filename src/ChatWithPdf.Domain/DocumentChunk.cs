using Pgvector;

public class DocumentChunk
{
    public Guid Id { get; private set; }

    public Guid DocumentId { get; private set; }

    public string Content { get; private set; } = null!;

    public int ChunkIndex { get; private set; }

    public Vector? Embedding { get; private set; }

    public DateTime CreatedAt { get; private set; }

    public Document Document { get; private set; } = null!;
}