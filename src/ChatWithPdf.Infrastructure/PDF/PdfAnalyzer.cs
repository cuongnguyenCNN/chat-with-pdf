using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChatWithPdf.Application.Pdf;
using UglyToad.PdfPig;

namespace ChatWithPdf.Infrastructure.Pdf;

public sealed class PdfAnalyzer : IPdfAnalyzer
{
    private const int MinimumCharactersForTextPdf = 100;

    public PdfAnalysis Analyze(Stream stream)
    {
        if (!stream.CanSeek)
        {
            throw new InvalidOperationException(
                "PDF stream must support seeking.");
        }

        stream.Position = 0;

        using var document = PdfDocument.Open(stream);

        var pages = document.GetPages().ToList();

        if (pages.Count == 0)
        {
            return new PdfAnalysis(
                IsScanned: true,
                HasComplexLayout: false,
                TotalPages: 0,
                PagesWithText: 0,
                TotalCharacters: 0,
                AverageCharactersPerPage: 0,
                MaxColumns: 0
            );
        }

        var pageAnalyses = pages
            .Select(AnalyzePage)
            .ToList();

        var totalCharacters = pageAnalyses
            .Sum(x => x.CharacterCount);

        var pagesWithText = pageAnalyses
            .Count(x => x.CharacterCount > 0);

        var averageCharactersPerPage =
            pagesWithText == 0
                ? 0
                : (double)totalCharacters / pagesWithText;

        var maxColumns = pageAnalyses
            .Max(x => x.ColumnCount);

        var isScanned =
            totalCharacters < MinimumCharactersForTextPdf;

        var hasComplexLayout =
            pageAnalyses.Any(x =>
                x.HasMultipleColumns ||
                x.HasLargeHorizontalGaps);

        stream.Position = 0;

        return new PdfAnalysis(
            IsScanned: isScanned,
            HasComplexLayout: hasComplexLayout,
            TotalPages: pages.Count,
            PagesWithText: pagesWithText,
            TotalCharacters: totalCharacters,
            AverageCharactersPerPage: averageCharactersPerPage,
            MaxColumns: maxColumns
        );
    }

    private static PageAnalysis AnalyzePage(
        UglyToad.PdfPig.Content.Page page)
    {
        var text = page.Text?.Trim() ?? string.Empty;

        var words = page
            .GetWords()
            .ToList();

        if (words.Count == 0)
        {
            return new PageAnalysis(
                CharacterCount: text.Length,
                ColumnCount: 0,
                HasMultipleColumns: false,
                HasLargeHorizontalGaps: false
            );
        }

        var columnCount = DetectColumnCount(
            words,
            page.Width
        );

        var hasMultipleColumns = columnCount >= 2;

        var hasLargeHorizontalGaps =
            DetectLargeHorizontalGaps(words);

        return new PageAnalysis(
            CharacterCount: text.Length,
            ColumnCount: columnCount,
            HasMultipleColumns: hasMultipleColumns,
            HasLargeHorizontalGaps: hasLargeHorizontalGaps
        );
    }

    private static int DetectColumnCount(
        IReadOnlyList<UglyToad.PdfPig.Content.Word> words,
        double pageWidth)
    {
        if (words.Count < 20)
            return 1;

        var pageMidpoint = pageWidth / 2;

        var leftWords = words.Count(w =>
            w.BoundingBox.Centroid.X < pageMidpoint);

        var rightWords = words.Count(w =>
            w.BoundingBox.Centroid.X >= pageMidpoint);

        if (leftWords < 10 || rightWords < 10)
            return 1;

        var leftRatio =
            (double)leftWords / words.Count;

        var rightRatio =
            (double)rightWords / words.Count;

        // Both halves contain meaningful amounts of text.
        if (leftRatio > 0.20 && rightRatio > 0.20)
            return 2;

        return 1;
    }

    private static bool DetectLargeHorizontalGaps(
        IReadOnlyList<UglyToad.PdfPig.Content.Word> words)
    {
        if (words.Count < 10)
            return false;

        var orderedWords = words
            .OrderBy(w => w.BoundingBox.Bottom)
            .ThenBy(w => w.BoundingBox.Left)
            .ToList();

        var largeGapCount = 0;

        for (var i = 1; i < orderedWords.Count; i++)
        {
            var previous = orderedWords[i - 1];
            var current = orderedWords[i];

            var sameLine =
                Math.Abs(
                    previous.BoundingBox.Bottom -
                    current.BoundingBox.Bottom
                ) < 5;

            if (!sameLine)
                continue;

            var gap =
                current.BoundingBox.Left -
                previous.BoundingBox.Right;

            if (gap > 100)
            {
                largeGapCount++;
            }
        }

        return largeGapCount >= 3;
    }

    private sealed record PageAnalysis(
        int CharacterCount,
        int ColumnCount,
        bool HasMultipleColumns,
        bool HasLargeHorizontalGaps
    );
}