using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public sealed class OcrPdfExtractor : IPdfExtractor
{
    public async Task<List<ExtractedPage>> ExtractAsync(
        Stream stream)
    {
        // Render PDF pages as images
        // Run OCR
        // Return ExtractedPage
        throw new NotImplementedException();
    }
}