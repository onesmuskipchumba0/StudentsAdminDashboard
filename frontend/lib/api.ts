const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new APIError(response.status, error.message || 'Something went wrong');
  }

  return response.json();
}

export const api = {
  // Documents
  getDocuments: () => fetchAPI('/documents'),
  getDocumentStats: () => fetchAPI('/documents/stats'),
  uploadDocument: (formData: FormData) => 
    fetchAPI('/documents/upload', {
      method: 'POST',
      body: formData,
    }),
  deleteDocument: (id: string) => 
    fetchAPI(`/documents/${id}`, {
      method: 'DELETE',
    }),
  toggleStar: (id: string) => 
    fetchAPI(`/documents/${id}/star`, {
      method: 'PATCH',
    }),
  toggleShare: (id: string) => 
    fetchAPI(`/documents/${id}/share`, {
      method: 'PATCH',
    }),
  updateTags: (id: string, tags: string[]) => 
    fetchAPI(`/documents/${id}/tags`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tags }),
    }),
}; 