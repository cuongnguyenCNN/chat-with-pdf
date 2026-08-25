import SourceCitation from "./SourceCitation";

export interface Source {
  chunkId?: string;
  documentId?: string;
  pageNumber?: number;
  content: string;
  score?: number;
}

export interface ChatMessageData {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

interface ChatMessageProps {
  message: ChatMessageData;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-3xl rounded-xl px-5 py-4 ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-gray-800 bg-gray-900"
        }`}
      >
        <div className="whitespace-pre-wrap text-sm leading-7">
          {message.content}
        </div>

        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-5 border-t border-gray-800 pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Sources
            </p>

            <div className="space-y-2">
              {message.sources.map((source, index) => (
                <SourceCitation
                  key={source.chunkId ?? `${source.pageNumber}-${index}`}
                  source={source}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
