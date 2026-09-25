using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChatWithPdf.Application;
using UglyToad.PdfPig;

public sealed class PdfPigLayoutExtractor : IPdfExtractor
{
    public Task<List<ExtractedPage>> ExtractAsync(Stream stream)
    {
        var pages = new List<ExtractedPage>();

        using var document = PdfDocument.Open(stream);

        foreach (var page in document.GetPages())
        {
            var words = page
                .GetWords()
                .ToList();

            if (words.Count == 0)
                continue;

            var text = string.Join(
                " ",
                words.Select(x => x.Text)
            );

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