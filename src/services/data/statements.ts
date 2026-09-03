import { getUserToken } from '@/lib/helper/auth/user';
import { cacheLife, cacheTag } from 'next/cache';
import { serverFetch } from '../server-fetch';
import { ExamResult, TExameStatemant, TQuestion } from '@/types/global';
import { handleApiError } from '../error-handler';

export const getAllQuestion = async (): Promise<ExamResult[]> => {
  try {
    const token = await getUserToken();
    const getStudentsRequests = async () => {
      'use cache';
      cacheTag('exame-statements-questions');
      cacheLife('hours');
      return serverFetch<ExamResult[]>('/exame-statemant', {}, token);
    };

    return getStudentsRequests();
  } catch (error) {
    handleApiError(error);
  }
};
export const getQuestion = async (id: string): Promise<TQuestion> => {
  try {
    const token = await getUserToken();
    const getStudentsRequests = async () => {
      'use cache';
      cacheTag(`exame-statements-question-${id}`);
      cacheLife('hours');
      return serverFetch<TQuestion>(`/question/${id}`, {}, token);
    };

    return getStudentsRequests();
  } catch (error) {
    handleApiError(error);
  }
};
export const getunCacheQuestion = async (id: string): Promise<TQuestion> => {
  try {
    // const token = await getUserToken();
    const result = await serverFetch<TQuestion>(`/question/${id}`, {}, '');

    return result;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllExameStatements = async (): Promise<TExameStatemant[]> => {
  try {
    const token = await getUserToken();
    const getExameStatements = async () => {
      'use cache';
      cacheTag('exame-statements');
      cacheLife('hours');
      return serverFetch<TExameStatemant[]>('/exame-statements', {}, token);
    };

    return getExameStatements();
  } catch (error) {
    handleApiError(error);
  }
};
