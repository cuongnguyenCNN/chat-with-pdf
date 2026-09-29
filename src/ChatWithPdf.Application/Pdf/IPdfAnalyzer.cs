    using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatWithPdf.Application.Pdf;

public interface IPdfAnalyzer
{
    PdfAnalysis Analyze(Stream stream);
}