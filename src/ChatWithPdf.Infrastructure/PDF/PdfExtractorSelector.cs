using ChatWithPdf.Application.Pdf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UglyToad.PdfPig;

public sealed class PdfExtractorSelector : IPdfExtractorSelector
{
    private readonly IPdfAnalyzer _analyzer;
    private readonly PdfPigTextExtractor _textExtractor;
    private readonly PdfPigLayoutExtractor _layoutExtractor;
    private readonly OcrPdfExtractor _ocrExtractor;

    public PdfExtractorSelector(
        IPdfAnalyzer analyzer,
        PdfPigTextExtractor textExtractor,
        PdfPigLayoutExtractor layoutExtractor,
        OcrPdfExtractor ocrExtractor)
    {
        _analyzer = analyzer;
        _textExtractor = textExtractor;
        _layoutExtractor = layoutExtractor;
        _ocrExtractor = ocrExtractor;
    }

    public IPdfExtractor Select(Stream stream)
    {
        var analysis = _analyzer.Analyze(stream);

        stream.Position = 0;

        // 1. No meaningful text
        // → probably scanned PDF
        if (analysis.IsScanned)
        {
            return _ocrExtractor;
        }

        // 2. Text exists but document has
        // complex spatial structure
        if (analysis.HasComplexLayout)
        {
            return _layoutExtractor;
        }

        // 3. Normal text-based PDF
        return _textExtractor;
    }
}
