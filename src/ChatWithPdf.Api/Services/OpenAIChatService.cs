using OpenAI.Chat;

namespace ChatWithPdf.Api.Services;

public class OpenAIChatService
    : IChatService
{
    private readonly ChatClient _client;

    public OpenAIChatService(
        IConfiguration configuration)
    {
        var apiKey =
            configuration["OpenAI:ApiKey"]
            ?? throw new InvalidOperationException(
                "OpenAI API key is missing."
            );

        var model =
            configuration["OpenAI:ChatModel"]
            ?? "gpt-4.1-mini";

        _client = new ChatClient(
            model,
            apiKey
        );
    }

    public async Task<string> GenerateAnswerAsync(
        string question,
        IReadOnlyList<VectorSearchResult> sources,
        CancellationToken cancellationToken = default)
    {
        var context = string.Join(
            "\n\n",
            sources.Select(
                (source, index) =>
                    $"[Source {index + 1}]\n" +
                    $"Page: {source.Chunk.PageNumber}\n" +
                    source.Chunk.Content
            )
        );

        var prompt = $"""
You are a helpful AI assistant that answers questions
about a PDF document.

Use ONLY the provided context.

If the answer cannot be found in the context,
say that the information is not available in the document.

Do not invent facts.

Context:

{context}

Question:

{question}

Answer:
""";

        var messages = new List<ChatMessage>
        {
            new SystemChatMessage(
                "You answer questions using retrieved document context."
            ),

            new UserChatMessage(prompt)
        };

        var result =
            await _client.CompleteChatAsync(
                messages,
                cancellationToken: cancellationToken
            );

        return result.Value.Content
            .FirstOrDefault()?
            .Text
            ?? "I couldn't generate an answer.";
    }
}