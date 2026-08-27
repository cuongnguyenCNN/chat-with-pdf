public class Document
{
    public Guid Id { get; private set; }

    public string FileName { get; private set; } = null!;

    public string Status { get; private set; } = null!;

    public DateTime CreatedAt { get; private set; }

    public DateTime UpdatedAt { get; private set; }

    public ICollection<DocumentChunk> Chunks { get; private set; }
        = new List<DocumentChunk>();
}