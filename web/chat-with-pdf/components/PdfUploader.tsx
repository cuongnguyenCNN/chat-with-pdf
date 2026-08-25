"use client";

import { uploadDocument } from "@/lib/api";
import { ChangeEvent, DragEvent, useState } from "react";

interface PdfUploaderProps {
  onUploaded?: (documentId: string) => void;
}

export default function PdfUploader({ onUploaded }: PdfUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (selectedFile: File) => {
    setError("");

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      return;
    }

    setFile(selectedFile);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      setError("");

      const result = await uploadDocument(file);

      onUploaded?.(result.id);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload document.",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
      <label
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 px-6 py-16 transition hover:border-blue-500"
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          className="hidden"
        />

        <div className="text-4xl">📄</div>

        <p className="mt-4 font-medium">
          {file ? file.name : "Drop your PDF here or click to browse"}
        </p>

        <p className="mt-2 text-sm text-gray-500">PDF files only</p>
      </label>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      {file && (
        <div className="mt-5 flex items-center justify-between rounded-lg bg-gray-800 p-4">
          <div>
            <p className="font-medium">{file.name}</p>

            <p className="text-sm text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}
    </div>
  );
}
