"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";

export default function UploadPdfModal() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectFile = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      selectFile(selectedFile);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      selectFile(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    // TODO:
    // const formData = new FormData();
    // formData.append("file", file);
    //
    // await fetch("/api/documents", {
    //   method: "POST",
    //   body: formData,
    // });

    console.log("Uploading:", file.name);
  };

  const closeModal = () => {
    setOpen(false);
    setFile(null);
    setIsDragging(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
     
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full items-center justify-center gap-2 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
      >
        <span className="text-lg leading-none">+</span>
        Upload PDF
      </button>

      
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
            
            <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Upload a PDF
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Upload a document to start chatting with it.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            
            <div className="p-6">
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {!file ? (
                <div
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                  className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/40"
                  }`}
                >
                  
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
                    ↑
                  </div>

                  <h3 className="mt-5 text-sm font-semibold text-gray-900">
                    Drop your PDF here
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    or{" "}
                    <span className="font-medium text-blue-600">
                      browse files
                    </span>
                  </p>

                  <p className="mt-4 text-xs text-gray-400">
                    PDF files only
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-xs font-bold text-red-500">
                      PDF
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {file.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);

                        if (inputRef.current) {
                          inputRef.current.value = "";
                        }
                      }}
                      className="text-xs font-medium text-gray-500 hover:text-gray-900"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            
            <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-200/60 hover:text-gray-900"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!file}
                onClick={handleUpload}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Upload & Start Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}