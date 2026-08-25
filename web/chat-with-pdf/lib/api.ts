const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export interface DocumentDto {
  id: string;
  fileName: string;
  status: string;
  createdAt: string;
}

export interface SourceDto {
  chunkId?: string;
  documentId?: string;
  pageNumber?: number;
  content: string;
  score?: number;
}

export interface AskResponse {
  answer: string;
  sources: SourceDto[];
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "API request failed.";

    try {
      const error = await response.json();

      message = error.message ?? error.title ?? error.detail ?? message;
    } catch {
      // Ignore JSON parsing errors.
    }

    throw new Error(message);
  }

  return response.json();
}

export async function uploadDocument(file: File): Promise<DocumentDto> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_URL}/documents`, {
    method: "POST",
    body: formData,
  });

  return handleResponse<DocumentDto>(response);
}

export async function getDocuments(): Promise<DocumentDto[]> {
  const response = await fetch(`${API_URL}/documents`, {
    method: "GET",
    cache: "no-store",
  });

  return handleResponse<DocumentDto[]>(response);
}

export async function getDocument(documentId: string): Promise<DocumentDto> {
  const response = await fetch(`${API_URL}/documents/${documentId}`, {
    method: "GET",
    cache: "no-store",
  });

  return handleResponse<DocumentDto>(response);
}

export async function deleteDocument(documentId: string): Promise<void> {
  const response = await fetch(`${API_URL}/documents/${documentId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete document.");
  }
}

export async function askQuestion(
  documentId: string,
  question: string,
): Promise<AskResponse> {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      documentId,
      question,
    }),
  });

  return handleResponse<AskResponse>(response);
}
