
using OpenAI.Embeddings;

namespace ChatWithPdf.Api.Services;

public class OpenAIEmbeddingService : IEmbeddingService
{
    private readonly EmbeddingClient _client;

    public OpenAIEmbeddingService(IConfiguration configuration)
    {
        var apiKey = configuration["OpenAI:ApiKey"];

        if (string.IsNullOrWhiteSpace(apiKey))
        {
            throw new InvalidOperationException(
                "OpenAI API key is missing. " +
                "Configure OpenAI:ApiKey using User Secrets."
            );
        }

        var model =
            configuration["OpenAI:EmbeddingModel"]
            ?? "text-embedding-3-small";

        _client = new EmbeddingClient(
            model,
            apiKey);
    }

    public async Task<float[]> CreateEmbeddingAsync(
        string text,
        CancellationToken cancellationToken = default)
    {
        var result =
            await _client.GenerateEmbeddingAsync(
                text,
                cancellationToken: cancellationToken);

        return result.Value
            .ToFloats()
            .ToArray();
    }
}

