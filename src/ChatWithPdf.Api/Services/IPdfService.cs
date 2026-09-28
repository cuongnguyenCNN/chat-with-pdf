namespace ChatWithPdf.Api.Services;

public interface IPdfService
{
    Task<List<ExtractedPage>> ExtractTextAsync(
        Stream stream);
}

public record PdfPage(
    int PageNumber,
    string Text
);