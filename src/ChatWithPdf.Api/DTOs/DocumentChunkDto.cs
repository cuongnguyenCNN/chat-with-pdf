namespace ChatWithPdf.Api.DTOs
{
    public class DocumentChunkDto
    {
    }
}
public record DocumentChunkDto(
    Guid Id,
    int ChunkIndex,
    int? PageNumber,
    string Content,
    int TokenCount
);