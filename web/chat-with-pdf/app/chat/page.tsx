"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import PdfUploader from "@/components/PdfUploader";
import DocumentList from "../../components/DocumentList";

export default function UploadPage() {
  const router = useRouter();

  const [refreshDocuments, setRefreshDocuments] = useState(0);

  const handleUploaded = (documentId: string) => {
    setRefreshDocuments((value) => value + 1);

    router.push(`/chat?documentId=${documentId}`);
  };

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Upload PDF</h1>

          <p className="mt-2 text-gray-400">
            Upload a document to start asking questions.
          </p>
        </div>

        <PdfUploader onUploaded={handleUploaded} />

        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">Your Documents</h2>

          <DocumentList refresh={refreshDocuments} />
        </div>
      </div>
    </main>
  );
}
