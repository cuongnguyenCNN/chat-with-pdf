using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace ChatWithPdf.Infrastructure.Pdf.Layout;

public sealed record PdfWord(
    string Text,
    double Left,
    double Right,
    double Top,
    double Bottom,
    double Width,
    double Height
);