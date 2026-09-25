using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UglyToad.PdfPig;

public sealed class PdfPigTextExtractor : IPdfExtractor
{
    public Task<List<ExtractedPage>> ExtractAsync(Stream stream)
    {
        var pages = new List<ExtractedPage>();

        using var document = PdfDocument.Open(stream);

        foreach (var page in document.GetPages())
        {
            var text = page.Text?.Trim();

            if (string.IsNullOrWhiteSpace(text))
                continue;

            pages.Add(
                new ExtractedPage(
                    page.Number,
                    text
                )
            );
        }

        return Task.FromResult(pages);
    }
}