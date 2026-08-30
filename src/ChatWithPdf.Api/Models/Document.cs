namespace ChatWithPdf.Api.Models;

public class Document
{
    public Guid Id { get; set; }

    public string FileName { get; set; } = string.Empty;

    public string Status { get; set; } = "Processing";

    public DateTime CreatedAt { get; set; }

    public List<DocumentChunk> Chunks { get; set; } = new();
}