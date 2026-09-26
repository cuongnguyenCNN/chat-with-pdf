using UglyToad.PdfPig;

namespace ChatWithPdf.Api.Services;

public class PdfService : IPdfService
{
    public Task<List<PdfPage>> ExtractTextAsync(
        Stream stream)
    {
        var pages = new List<PdfPage>();

        using var document =
            PdfDocument.Open(stream);

        foreach (var page in document.GetPages())
        {
            var text = page.Text?.Trim();

            if (string.IsNullOrWhiteSpace(text))
                continue;

            pages.Add(
                new PdfPage(
                    page.Number,
                    text
                )
            );
        }

        return Task.FromResult(pages);
    }
}
//public sealed class PdfPigTextExtractor : IPdfService
//{
//    public Task<List<PdfPage>> ExtractAsync(Stream stream)
//    {
//        var pages = new List<PdfPage>();

//        using var document = PdfDocument.Open(stream);

//        foreach (var page in document.GetPages())
//        {
//            var text = page.Text?.Trim();

//            if (string.IsNullOrWhiteSpace(text))
//                continue;

//            pages.Add(
//                new PdfPage(
//                    page.Number,
//                    text
//                )
//            );
//        }

//        return Task.FromResult(pages);
//    }
//}