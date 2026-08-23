export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
).replace(/\/+$/, '');

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

export function getToken(): string | null {
  return localStorage.getItem('civicpulse_token');
}

export function setToken(token: string | null): void {
  if (token) {
    localStorage.setItem('civicpulse_token', token);
  } else {
    localStorage.removeItem('civicpulse_token');
  }
}

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers || {});

  const token = getToken();

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers.has('Content-Type')
  ) {
    headers.set('Content-Type', 'application/json');
  }

  // Prevent double slashes between API URL and endpoint
  const cleanBaseUrl = API_BASE_URL.replace(/\/+$/, '');
  const cleanPath = `/${path.replace(/^\/+/, '')}`;

  const url = `${cleanBaseUrl}${cleanPath}`;

  console.log('API Request:', options.method || 'GET', url);

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed (${response.status})`
    );
  }

  return data as T;
}