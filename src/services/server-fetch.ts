// lib/fetch/server-fetch.ts

import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/auth';
import { ApiResponseError } from './api-error';
import { handleApiError } from './error-handler';

const baseURL = process.env.API_BASE_URL;

type ServerFetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
  next?: { revalidate?: number; tags?: string[] };
};

export async function serverFetch<T>(
  endpoint: string,
  options: ServerFetchOptions = {}
): Promise<T> {
  try {
    const session = await getServerSession(authOptions);
    const isFormData = options.body instanceof FormData;
    const headers: Record<string, string> = {
      ...(options.headers ?? {}),
    };
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    if (session?.user?.accessToken) {
      headers['Authorization'] = `Bearer ${session.user.accessToken}`;
    }

    const response = await fetch(`${baseURL}${endpoint}`, {
      method: options.method || 'GET',
      body: options.body ? JSON.stringify(options.body) : undefined,
      headers,
      next: options.next,
    });
    const json = await response.json();

    if (!response.ok || json?.success === false) {
      throw new ApiResponseError(
        response.status,
        json?.message || 'Request failed',
        json?.errorMessages,
        json?.meta,
        json?.stack
      );
    }

    return json.data as T;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}
