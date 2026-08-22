/**
 * Centralized API Client for CivicVerify Frontend
 * All backend communication goes through this module
 */

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
  possibleDuplicate?: boolean;
  duplicateCount?: number;
  duplicates?: unknown[];
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {};
    const token = localStorage.getItem('cv_auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async get<T = unknown>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const res = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Network error' }));
      throw new Error(err.message || `Request failed with status ${res.status}`);
    }

    return res.json();
  }

  async post<T = unknown>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getHeaders(),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Network error' }));
      throw new Error(err.message || `Request failed with status ${res.status}`);
    }

    return res.json();
  }

  async postFormData<T = unknown>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    const headers = this.getHeaders();
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Network error' }));
      throw new Error(err.message || `Request failed with status ${res.status}`);
    }

    return res.json();
  }

  async patch<T = unknown>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...this.getHeaders(),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Network error' }));
      throw new Error(err.message || `Request failed with status ${res.status}`);
    }

    return res.json();
  }

  async patchFormData<T = unknown>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    const headers = this.getHeaders();
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers,
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Network error' }));
      throw new Error(err.message || `Request failed with status ${res.status}`);
    }

    return res.json();
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export { API_BASE_URL };
export type { ApiResponse };
