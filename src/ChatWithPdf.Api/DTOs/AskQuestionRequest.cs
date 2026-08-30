namespace ChatWithPdf.Api.DTOs;

public record AskQuestionRequest(
    Guid DocumentId,
    string Question
);