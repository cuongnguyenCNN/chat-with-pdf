namespace ChatWithPdf.Api.Services;

public interface IChatService
{
    Task<string> GenerateAnswerAsync(
        string question,
        IReadOnlyList<VectorSearchResult> sources,
        CancellationToken cancellationToken = default);
}