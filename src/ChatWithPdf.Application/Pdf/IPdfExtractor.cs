using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


    public interface IPdfExtractor
    {
        Task<List<ExtractedPage>> ExtractAsync(Stream stream);
    }

public sealed record ExtractedPage(
    int PageNumber,
    string Text
);