"use client";

import { FormEvent, useState } from "react";

import { askQuestion } from "@/lib/api";

import ChatMessage, { ChatMessageData } from "./ChatMessage";

interface ChatWindowProps {
  documentId: string;
}

export default function ChatWindow({ documentId }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) {
      return;
    }

    const userMessage: ChatMessageData = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((current) => [...current, userMessage]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await askQuestion(documentId, trimmedQuestion);

      const assistantMessage: ChatMessageData = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.answer,
        sources: response.sources,
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessageData = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          error instanceof Error ? error.message : "Something went wrong.",
      };

      setMessages((current) => [...current, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <header className="border-b border-gray-800 px-6 py-4">
        <h1 className="font-semibold">Chat with PDF</h1>

        <p className="text-xs text-gray-500">Document ID: {documentId}</p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                Ask anything about this document
              </h2>

              <p className="mt-2 text-gray-500">
                The AI will retrieve relevant chunks from your PDF before
                answering.
              </p>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {loading && (
              <div className="text-sm text-gray-500">
                Searching the document...
              </div>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-800 p-5">
        <div className="mx-auto flex max-w-4xl gap-3">
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask a question about your PDF..."
            disabled={loading}
            className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm outline-none placeholder:text-gray-600 focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Ask
          </button>
        </div>
      </form>
    </div>
  );
}
