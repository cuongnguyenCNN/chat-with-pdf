namespace ChatWithPdf.Api.Services;

public interface IPdfService
{
    Task<List<PdfPage>> ExtractTextAsync(
        Stream stream);
}

public record PdfPage(
    int PageNumber,
    string Text
);