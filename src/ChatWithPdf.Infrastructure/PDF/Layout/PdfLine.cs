using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatWithPdf.Infrastructure.Pdf.Layout;

public sealed class PdfLine
{
    private readonly List<PdfWord> _words = [];

    public IReadOnlyList<PdfWord> Words => _words;

    public double Top =>
        _words.Count == 0
            ? 0
            : _words.Max(x => x.Top);

    public double Bottom =>
        _words.Count == 0
            ? 0
            : _words.Min(x => x.Bottom);

    public double Left =>
        _words.Count == 0
            ? 0
            : _words.Min(x => x.Left);

    public double Right =>
        _words.Count == 0
            ? 0
            : _words.Max(x => x.Right);

    public double Height =>
        Top - Bottom;

    public void Add(PdfWord word)
    {
        _words.Add(word);
    }

    public string GetText()
    {
        return string.Join(
            " ",
            _words
                .OrderBy(x => x.Left)
                .Select(x => x.Text)
        );
    }
}