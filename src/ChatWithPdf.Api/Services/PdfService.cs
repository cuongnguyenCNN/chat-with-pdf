using UglyToad.PdfPig;
using ChatWithPdf.Infrastructure;
namespace ChatWithPdf.Api.Services;

//public class PdfService : IPdfService
//{
//    public Task<List<PdfPage>> ExtractTextAsync(
//        Stream stream)
//    {
//        var pages = new List<PdfPage>();

//        using var document =
//            PdfDocument.Open(stream);

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

public class PdfService : IPdfService
{
    private readonly IPdfExtractorSelector _extractorSelector;

    public PdfService(
        IPdfExtractorSelector extractorSelector)
    {
        _extractorSelector = extractorSelector;
    }

    public async Task<List<ExtractedPage>> ExtractTextAsync(
        Stream stream)
    {
        var extractor = _extractorSelector.Select(stream);

        stream.Position = 0;

        return await extractor.ExtractAsync(stream);
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