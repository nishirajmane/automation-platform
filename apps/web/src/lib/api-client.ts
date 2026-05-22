/**
 * Lightweight, type-safe API client for calling the backend.
 *
 * Usage:
 *   const data = await apiClient<HealthStatus>('/health');
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL 
  ?? (typeof window === 'undefined' ? 'http://api:4000' : '/api');

export async function apiClient<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
    // Disable Next.js cache for API calls by default
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
