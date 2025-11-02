import { TCalendar } from '@/types/global';
import { serverFetch } from '../server-fetch';
import { handleApiError } from '../error-handler';

export const getAllCalendarEvents = async (): Promise<TCalendar[]> => {
  try {
    const calendar = await serverFetch<TCalendar[]>('/calendar', {
      next: { tags: ['calendar'] },
    });
    return calendar;
  } catch (error) {
    handleApiError(error);
  }
};
