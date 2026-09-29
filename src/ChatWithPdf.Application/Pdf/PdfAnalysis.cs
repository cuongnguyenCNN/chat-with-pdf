using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatWithPdf.Application.Pdf;

public sealed record PdfAnalysis(
    bool IsScanned,
    bool HasComplexLayout,
    int TotalPages,
    int PagesWithText,
    int TotalCharacters,
    double AverageCharactersPerPage,
    int MaxColumns
);