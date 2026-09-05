import { IQueryParams } from '@/types/global';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const queryParams = (query: IQueryParams | undefined) => {
  const queryString = new URLSearchParams(
    Object.entries(query || {}).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '')
          acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>,
    ),
  ).toString();
  return queryString;
};
