namespace ChatWithPdf.Api.DTOs;

public record SourceDto(
    Guid ChunkId,
    Guid DocumentId,
    int? PageNumber,
    string Content,
    double Score
);