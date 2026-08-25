import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
          AI Engineering with .NET
        </div>

        <h1 className="max-w-3xl text-5xl font-bold tracking-tight">
          Chat with your PDF
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-400">
          Upload a PDF, ask questions, and get answers grounded in the document
          using RAG.
        </p>

        <Link
          href="/upload"
          className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-500"
        >
          Upload a PDF
        </Link>
      </div>
    </main>
  );
}
