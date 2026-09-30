// // import Link from "next/link";

// // export default function HomePage() {
// //   return (
// //     <main className="min-h-screen bg-gray-950 text-white">
// //       <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
// //         <div className="mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
// //           AI Engineering with .NET
// //         </div>

// //         <h1 className="max-w-3xl text-5xl font-bold tracking-tight">
// //           Chat with your PDF
// //         </h1>

// //         <p className="mt-6 max-w-2xl text-lg text-gray-400">
// //           Upload a PDF, ask questions, and get answers grounded in the document
// //           using RAG.
// //         </p>

// //         <Link
// //           href="/upload"
// //           className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-500"
// //         >
// //           Upload a PDF
// //         </Link>
// //       </div>
// //     </main>
// //   );
// // }
// import Link from "next/link";

// const recentDocuments = [
//   {
//     name: "AI Engineering Guide.pdf",
//     pages: 42,
//     status: "Ready",
//   },
//   {
//     name: "System Design Interview.pdf",
//     pages: 86,
//     status: "Ready",
//   },
// ];

// export default function Dashboard() {
//   return (
//     <main className="min-h-screen bg-gray-50 text-gray-900">
//       <div className="flex min-h-screen">
//         
//         <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white lg:flex lg:flex-col">
//           
//           <div className="flex h-16 items-center border-b border-gray-200 px-6">
//             <div className="flex items-center gap-2.5">
//               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
//                 AI
//               </div>

//               <span className="font-semibold tracking-tight">
//                 Chat with PDF
//               </span>
//             </div>
//           </div>

//           
//           <nav className="flex-1 p-4">
//             <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
//               Workspace
//             </div>

//             <div className="space-y-1">
//               <Link
//                 href="/"
//                 className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-medium text-blue-600"
//               >
//                 <span>⌂</span>
//                 Dashboard
//               </Link>

//               <Link
//                 href="/upload"
//                 className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
//               >
//                 <span>↑</span>
//                 Upload PDF
//               </Link>
//             </div>

//             <div className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
//               Resources
//             </div>

//             <div className="space-y-1">
//               <Link
//                 href="/documents"
//                 className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
//               >
//                 <span>▤</span>
//                 Documents
//               </Link>
//             </div>
//           </nav>

//           
//           <div className="border-t border-gray-200 p-4">
//             <div className="rounded-xl bg-gray-50 p-4">
//               <p className="text-xs font-semibold text-gray-900">
//                 AI Engineering with .NET
//               </p>

//               <p className="mt-1 text-xs leading-5 text-gray-500">
//                 Build production AI applications with C# and .NET.
//               </p>
//             </div>
//           </div>
//         </aside>

//         
//         <div className="flex min-w-0 flex-1 flex-col">
//           
//           <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 lg:px-8">
//             <div>
//               <p className="text-sm font-medium text-gray-900">
//                 AI Workspace
//               </p>
//               <p className="hidden text-xs text-gray-500 sm:block">
//                 Ask questions about your documents
//               </p>
//             </div>

//             <Link
//               href="/upload"
//               className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
//             >
//               <span>+</span>
//               Upload PDF
//             </Link>
//           </header>

//           
//           <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 lg:px-8">
//             
//             <div>
//               <div className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
//                 AI Engineering with .NET
//               </div>

//               <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//                 Chat with your PDF
//               </h1>

//               <p className="mt-3 max-w-2xl text-base leading-7 text-gray-500">
//                 Upload a PDF, ask questions, and get answers grounded in the
//                 document using Retrieval-Augmented Generation.
//               </p>
//             </div>

//             
//             <div className="mt-10">
//               <Link
//                 href="/upload"
//                 className="group block rounded-2xl border border-dashed border-gray-300 bg-white p-10 transition hover:border-blue-400 hover:bg-blue-50/30 sm:p-14"
//               >
//                 <div className="mx-auto flex max-w-xl flex-col items-center text-center">
//                   
//                   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600 transition group-hover:bg-blue-100">
//                     ↑
//                   </div>

//                   <h2 className="mt-5 text-lg font-semibold text-gray-900">
//                     Upload a PDF to get started
//                   </h2>

//                   <p className="mt-2 text-sm text-gray-500">
//                     Drop your document here or click to browse
//                   </p>

//                   <div className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition group-hover:bg-blue-500">
//                     Upload a PDF
//                   </div>

//                   <p className="mt-4 text-xs text-gray-400">
//                     PDF documents · RAG-powered answers
//                   </p>
//                 </div>
//               </Link>
//             </div>

//             
//             <div className="mt-12">
//               <div className="mb-5 flex items-center justify-between">
//                 <div>
//                   <h2 className="text-sm font-semibold text-gray-900">
//                     How it works
//                   </h2>
//                   <p className="mt-1 text-xs text-gray-500">
//                     Your document becomes searchable AI context.
//                   </p>
//                 </div>
//               </div>

//               <div className="grid gap-4 md:grid-cols-4">
//                 {[
//                   {
//                     number: "01",
//                     title: "Upload",
//                     description: "Upload your PDF document.",
//                   },
//                   {
//                     number: "02",
//                     title: "Process",
//                     description: "Extract and chunk the content.",
//                   },
//                   {
//                     number: "03",
//                     title: "Retrieve",
//                     description: "Find relevant context with vectors.",
//                   },
//                   {
//                     number: "04",
//                     title: "Ask",
//                     description: "Generate grounded answers with AI.",
//                   },
//                 ].map((step) => (
//                   <div
//                     key={step.number}
//                     className="rounded-xl border border-gray-200 bg-white p-5"
//                   >
//                     <span className="text-xs font-bold text-blue-600">
//                       {step.number}
//                     </span>

//                     <h3 className="mt-3 text-sm font-semibold text-gray-900">
//                       {step.title}
//                     </h3>

//                     <p className="mt-1.5 text-xs leading-5 text-gray-500">
//                       {step.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             
//             <div className="mt-12">
//               <div className="mb-5 flex items-end justify-between">
//                 <div>
//                   <h2 className="text-sm font-semibold text-gray-900">
//                     Recent documents
//                   </h2>

//                   <p className="mt-1 text-xs text-gray-500">
//                     Continue working with your documents.
//                   </p>
//                 </div>

//                 <Link
//                   href="/documents"
//                   className="text-xs font-semibold text-blue-600 hover:text-blue-500"
//                 >
//                   View all →
//                 </Link>
//               </div>

//               <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
//                 {recentDocuments.map((document, index) => (
//                   <Link
//                     key={document.name}
//                     href="/documents"
//                     className={`flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-gray-50 ${
//                       index !== recentDocuments.length - 1
//                         ? "border-b border-gray-100"
//                         : ""
//                     }`}
//                   >
//                     <div className="flex min-w-0 items-center gap-4">
//                       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-xs font-bold text-red-500">
//                         PDF
//                       </div>

//                       <div className="min-w-0">
//                         <p className="truncate text-sm font-medium text-gray-900">
//                           {document.name}
//                         </p>

//                         <p className="mt-1 text-xs text-gray-400">
//                           {document.pages} pages
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex shrink-0 items-center gap-3">
//                       <span className="hidden rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600 sm:inline-flex">
//                         {document.status}
//                       </span>

//                       <span className="text-gray-400">→</span>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import UploadPdfModal from "./components/UploadPdfModal";

const documents = [
  {
    name: "AI Engineering Guide.pdf",
    pages: 42,
    active: true,
  },
  {
    name: "System Design Interview.pdf",
    pages: 86,
    active: false,
  },
];

const sources = [
  {
    page: 12,
    title: "Retrieval-Augmented Generation",
    text: "RAG combines information retrieval with language generation. Relevant document chunks are retrieved before the language model generates an answer.",
  },
  {
    page: 14,
    title: "Vector Search",
    text: "Embeddings represent text as vectors. Similarity search can then retrieve chunks that are semantically related to a user's question.",
  },
];

export default function ChatDashboard() {
  const [message, setMessage] = useState("");

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex h-screen overflow-hidden">
        
        <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white md:flex md:flex-col">
          
          <div className="flex h-16 items-center border-b border-gray-200 px-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                AI
              </div>

              <span className="font-semibold tracking-tight">
                Chat with PDF
              </span>
            </div>
          </div>

          
          <div className="p-4">
            {/* <Link
              href="/upload"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              <span className="text-lg leading-none">+</span>
              Upload PDF
            </Link> */}
             <UploadPdfModal></UploadPdfModal>
          </div>

          
          <div className="flex-1 overflow-y-auto px-3">
            <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Documents
            </div>

            <div className="space-y-1">
              {documents.map((document) => (
                <button
                  key={document.name}
                  className={`w-full rounded-lg px-3 py-3 text-left transition ${
                    document.active
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-50 text-[10px] font-bold text-red-500">
                      PDF
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`truncate text-sm font-medium ${
                          document.active
                            ? "text-blue-700"
                            : "text-gray-700"
                        }`}
                      >
                        {document.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {document.pages} pages
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          
          <div className="border-t border-gray-200 p-4">
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-700">
                AI Engineering with .NET
              </p>

              <p className="mt-1 text-[11px] leading-4 text-gray-400">
                C# · ASP.NET Core · OpenAI · RAG
              </p>
            </div>
          </div>
        </aside>

        
        <section className="flex min-w-0 flex-1 flex-col bg-white">
          
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-5 sm:px-7">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[10px] font-bold text-red-500">
                PDF
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-sm font-semibold text-gray-900">
                  AI Engineering Guide.pdf
                </h1>

                <p className="text-xs text-gray-400">
                  42 pages · Ready
                </p>
              </div>
            </div>

            <button className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50">
              New chat
            </button>
          </header>

          
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
              
              <div className="mb-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  ✦
                </div>

                <h2 className="mt-4 text-lg font-semibold text-gray-900">
                  Ask anything about this PDF
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Answers are generated from the content of your document
                  using RAG.
                </p>
              </div>

              
              <div className="mb-8 flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-blue-600 px-5 py-3.5 text-sm leading-6 text-white">
                  What is Retrieval-Augmented Generation and why is it useful?
                </div>
              </div>

              
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-xs font-bold text-white">
                  AI
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-sm leading-7 text-gray-700">
                    <p>
                      Retrieval-Augmented Generation (RAG) combines
                      information retrieval with language generation.
                    </p>

                    <p className="mt-4">
                      Instead of asking the language model to answer only from
                      its training data, the application first retrieves
                      relevant document chunks and provides them as context
                      for the model.
                    </p>

                    <p className="mt-4">
                      This makes it possible to build applications that answer
                      questions using your own documents while also providing
                      source references.
                    </p>
                  </div>

                  
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
                      Source · p.12
                    </button>

                    <button className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
                      Source · p.14
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="shrink-0 border-t border-gray-200 bg-white p-4 sm:p-5">
            <form className="mx-auto flex max-w-3xl items-end gap-3">
              <div className="flex flex-1 items-end rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={1}
                  placeholder="Ask a question about this PDF..."
                  className="max-h-32 flex-1 resize-none bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />

                <span className="ml-3 hidden text-[11px] text-gray-400 sm:block">
                  Enter ↵
                </span>
              </div>

              <button
                type="submit"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition hover:bg-blue-500"
              >
                ↑
              </button>
            </form>
          </div>
        </section>

        
        <aside className="hidden w-80 shrink-0 border-l border-gray-200 bg-gray-50 xl:flex xl:flex-col">
          <div className="border-b border-gray-200 bg-white px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Sources
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Retrieved context for this answer
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {sources.map((source) => (
                <div
                  key={source.page}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-blue-600">
                      Page {source.page}
                    </span>

                    <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-medium text-green-600">
                      Retrieved
                    </span>
                  </div>

                  <h3 className="mt-3 text-xs font-semibold text-gray-800">
                    {source.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    {source.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}