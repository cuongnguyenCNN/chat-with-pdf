namespace ChatWithPdf.Api.DTOs;

public record AskQuestionResponse(
    string Answer,
    List<SourceDto> Sources
);