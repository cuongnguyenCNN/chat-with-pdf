# Chat with PDF — RAG with .NET

A production-oriented **Retrieval-Augmented Generation (RAG)** application built with **.NET, ASP.NET Core, PostgreSQL, pgvector, and OpenAI**.

Upload a PDF, extract and chunk its content, generate embeddings, store the vectors in PostgreSQL, and ask questions about the document using natural language.

The project demonstrates how to build a real AI application with the .NET ecosystem instead of treating AI as a separate technology stack.

## What It Does

The application follows this pipeline:

```text
PDF
 ↓
Text Extraction
 ↓
Chunking
 ↓
Embeddings
 ↓
PostgreSQL + pgvector
 ↓
Similarity Search
 ↓
Relevant Chunks
 ↓
LLM
 ↓
Answer + Sources
```

Users can:

* Upload PDF documents
* Extract text from PDFs
* Split documents into searchable chunks
* Generate vector embeddings
* Store embeddings using PostgreSQL + pgvector
* Search for relevant document chunks
* Ask questions about uploaded documents
* Return answers with source citations
* Inspect the chunks extracted from a document

## Architecture

```text
                    ┌──────────────────────┐
                    │      Web App         │
                    │   Next.js + React    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    ASP.NET Core API  │
                    │      ChatWithPdf.Api │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        Application       Infrastructure      Domain
              │                │
              │                ├── PostgreSQL
              │                ├── pgvector
              │                ├── PDF extraction
              │                └── OpenAI
              │
              ▼
        RAG Pipeline
```

### Project Structure

```text
src/
├── ChatWithPdf.Api
├── ChatWithPdf.Application
├── ChatWithPdf.Domain
└── ChatWithPdf.Infrastructure

web/
└── chat-with-pdf/
    └── app/
        ├── components/
        ├── lib/
        └── ...
```

The dependency direction follows the application architecture:

```text
Domain
   ↑
Application
   ↑
Infrastructure

Api
 ↓
Application
```

Infrastructure implements application abstractions such as repositories and external services, while the API is responsible for exposing the application through HTTP endpoints.

## RAG Pipeline

### 1. Upload PDF

The API receives a PDF document and stores its metadata.

### 2. Extract Text

The application extracts text from the PDF.

Different extraction strategies can be selected depending on the document:

* PDF text extraction
* Layout-aware extraction
* OCR for scanned documents

### 3. Chunk the Document

The extracted text is split into smaller chunks.

Each chunk contains information such as:

```text
DocumentId
ChunkIndex
PageNumber
Content
TokenCount
Embedding
```

### 4. Generate Embeddings

Each chunk is converted into a vector embedding using an OpenAI embedding model.

### 5. Store Vectors

Embeddings are stored in PostgreSQL using the `pgvector` extension.

This allows semantic similarity search directly inside PostgreSQL.

### 6. Retrieve Relevant Chunks

When a user asks a question:

```text
User Question
      ↓
Question Embedding
      ↓
Vector Similarity Search
      ↓
Top Relevant Chunks
```

### 7. Generate the Answer

The retrieved chunks are provided to the LLM as context.

The model generates an answer grounded in the retrieved document content.

The API also returns source information so the UI can show where the answer came from.

## API Endpoints

### Documents

```http
POST /api/documents
```

Upload a PDF document.

```http
GET /api/documents
```

List uploaded documents.

```http
GET /api/documents/{id}
```

Get a document by ID.

```http
GET /api/documents/{id}/chunks
```

Inspect the chunks generated from a document.

```http
DELETE /api/documents/{id}
```

Delete a document and its associated chunks.

### Chat

```http
POST /api/chat
```

Ask a question about the documents and retrieve an AI-generated answer with relevant sources.

## Tech Stack

### Backend

* .NET
* ASP.NET Core
* Entity Framework Core
* PostgreSQL
* pgvector
* OpenAI
* Swagger / OpenAPI

### PDF Processing

* PDF text extraction
* Layout-aware extraction
* OCR support

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### AI

* Text embeddings
* Vector similarity search
* Retrieval-Augmented Generation
* LLM-based answer generation

## Running Locally

### Prerequisites

Make sure you have:

* .NET SDK
* Node.js
* PostgreSQL
* PostgreSQL `pgvector` extension
* OpenAI API key

### Configure the API

Configure your connection string and OpenAI credentials using .NET configuration or User Secrets.

Example:

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "YOUR_CONNECTION_STRING"
dotnet user-secrets set "OpenAI:ApiKey" "YOUR_API_KEY"
```

### Run the API

```bash
dotnet run --project src/ChatWithPdf.Api
```

Swagger will be available when the API is running.

### Run the Web App

```bash
cd web/chat-with-pdf
npm install
npm run dev
```

Then open the local development URL shown by Next.js.

## Example Workflow

Upload:

```text
software-architecture.pdf
```

Then ask:

```text
What are the main principles of the architecture described in this document?
```

The system:

1. Converts the question into an embedding
2. Searches the document vectors
3. Retrieves the most relevant chunks
4. Sends the chunks to the LLM
5. Generates a grounded answer
6. Returns the relevant sources

## Why This Project?

This project is designed to demonstrate the engineering decisions behind a real RAG system:

* How PDF ingestion works
* How documents are chunked
* How embeddings are generated
* How vector search works
* How PostgreSQL can be used as a vector database
* How retrieval connects to an LLM
* How source citations can be returned
* How to structure an AI application using .NET architecture
* How to separate Domain, Application, Infrastructure, and API concerns

It is intentionally built as an engineering project rather than a simple AI demo.

## Related

This project is part of my **AI Engineering with .NET** learning and development work.

The goal is to show how .NET developers can build modern AI applications using technologies they already know: C#, ASP.NET Core, PostgreSQL, Entity Framework Core, and cloud/AI services.

## License

This project is provided for educational and demonstration purposes.
