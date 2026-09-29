using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace ChatWithPdf.Infrastructure.Pdf.Layout;

public sealed class PdfBlock
{
    private readonly List<PdfLine> _lines = [];

    public IReadOnlyList<PdfLine> Lines => _lines;

    public double Top =>
        _lines.Count == 0
            ? 0
            : _lines.Max(x => x.Top);

    public double Bottom =>
        _lines.Count == 0
            ? 0
            : _lines.Min(x => x.Bottom);

    public double Left =>
        _lines.Count == 0
            ? 0
            : _lines.Min(x => x.Left);

    public double Right =>
        _lines.Count == 0
            ? 0
            : _lines.Max(x => x.Right);

    public double Height => Top - Bottom;

    public void Add(PdfLine line)
    {
        _lines.Add(line);
    }

    public string GetText()
    {
        return string.Join(
            Environment.NewLine,
            _lines
                .OrderByDescending(x => x.Top)
                .Select(x => x.GetText())
        );
    }
}