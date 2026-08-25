import { Source } from "./ChatMessage";

interface SourceCitationProps {
  source: Source;
  index: number;
}

export default function SourceCitation({ source, index }: SourceCitationProps) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-950 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-400">
          Source {index + 1}
          {source.pageNumber ? ` · Page ${source.pageNumber}` : ""}
        </span>

        {source.score !== undefined && (
          <span className="text-xs text-gray-600">
            Score: {source.score.toFixed(3)}
          </span>
        )}
      </div>

      <p className="mt-2 line-clamp-4 text-xs leading-5 text-gray-500">
        {source.content}
      </p>
    </div>
  );
}
