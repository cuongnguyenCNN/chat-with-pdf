namespace ChatWithPdf.Api.Services;

public static class TextChunker
{
    public static List<string> Chunk(
        string text,
        int chunkSize = 1200,
        int overlap = 200)
    {
        if (string.IsNullOrWhiteSpace(text))
            return new List<string>();

        var normalized =
            text.Replace("\r\n", "\n")
                .Replace("\r", "\n")
                .Trim();

        var chunks = new List<string>();

        var start = 0;

        while (start < normalized.Length)
        {
            var length =
                Math.Min(
                    chunkSize,
                    normalized.Length - start
                );

            var chunk =
                normalized
                    .Substring(start, length)
                    .Trim();

            if (!string.IsNullOrWhiteSpace(chunk))
            {
                chunks.Add(chunk);
            }

            if (start + length >= normalized.Length)
                break;

            start += chunkSize - overlap;
        }

        return chunks;
    }
}