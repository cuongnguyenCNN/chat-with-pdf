using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UglyToad.PdfPig;

public sealed class PdfExtractorSelector : IPdfExtractorSelector
{
    private readonly PdfPigTextExtractor _textExtractor;
    private readonly PdfPigLayoutExtractor _layoutExtractor;
    private readonly OcrPdfExtractor _ocrExtractor;

    public PdfExtractorSelector(
        PdfPigTextExtractor textExtractor,
        PdfPigLayoutExtractor layoutExtractor,
        OcrPdfExtractor ocrExtractor)
    {
        _textExtractor = textExtractor;
        _layoutExtractor = layoutExtractor;
        _ocrExtractor = ocrExtractor;
    }

  public IPdfExtractor Select(Stream stream)
    {
        if (!stream.CanSeek)
        {
            throw new InvalidOperationException(
                "PDF stream must support seeking.");
        }

        stream.Position = 0;

        using var document = PdfDocument.Open(stream);

        var pages = document.GetPages().ToList();

        var totalCharacters = pages
            .Select(page => page.Text)
            .Where(text => !string.IsNullOrWhiteSpace(text))
            .Sum(text => text!.Length);

        stream.Position = 0;

        // No meaningful text → probably scanned PDF
        if (totalCharacters < 100)
        {
            return _ocrExtractor;
        }

        // Text exists → use normal PdfPig extraction for now
        return _textExtractor;
    }
}