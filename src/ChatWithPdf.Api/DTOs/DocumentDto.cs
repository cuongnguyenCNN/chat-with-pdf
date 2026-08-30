namespace ChatWithPdf.Api.DTOs;

public record DocumentDto(
    Guid Id,
    string FileName,
    string Status,
    DateTime CreatedAt
);