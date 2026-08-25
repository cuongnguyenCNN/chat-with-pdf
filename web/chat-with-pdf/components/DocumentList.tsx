"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { deleteDocument, getDocuments, DocumentDto } from "@/lib/api";

interface DocumentListProps {
  refresh?: number;
  selectedDocumentId?: string;
}

export default function DocumentList({
  refresh = 0,
  selectedDocumentId,
}: DocumentListProps) {
  const [documents, setDocuments] = useState<DocumentDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, [refresh]);

  const loadDocuments = async () => {
    try {
      setLoading(true);

      const data = await getDocuments();

      setDocuments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this document?");

    if (!confirmed) return;

    try {
      await deleteDocument(id);

      setDocuments((current) =>
        current.filter((document) => document.id !== id),
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Loading documents...</div>;
  }

  if (documents.length === 0) {
    return (
      <div className="rounded-lg border border-gray-800 p-4 text-sm text-gray-500">
        No documents yet.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((document) => {
        const selected = document.id === selectedDocumentId;

        return (
          <div
            key={document.id}
            className={`group flex items-center justify-between rounded-lg border p-3 transition ${
              selected
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-800 bg-gray-900 hover:border-gray-700"
            }`}
          >
            <Link
              href={`/chat?documentId=${document.id}`}
              className="min-w-0 flex-1"
            >
              <p className="truncate text-sm font-medium">
                {document.fileName}
              </p>

              <p className="mt-1 text-xs text-gray-500">{document.status}</p>
            </Link>

            <button
              onClick={() => handleDelete(document.id)}
              className="ml-3 text-xs text-gray-600 opacity-0 transition hover:text-red-400 group-hover:opacity-100"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
