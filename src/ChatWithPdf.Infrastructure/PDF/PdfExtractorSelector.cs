using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        // TODO:
        // Detect PDF type here

        return _textExtractor;
    }
}