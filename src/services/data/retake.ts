import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';
import { TAtaDiscipline, TExames, TRetakeAta } from '@/types/global';
import { cacheLife, cacheTag } from 'next/cache';
import { getUserToken } from '@/lib/helper/auth/user';

export const getAllRetakes = async (): Promise<TExames[]> => {
  try {
    const token = await getUserToken();
    const getRetakes = async () => {
      'use cache';
      cacheTag('exame-retake');
      cacheLife('hours');
      return serverFetch<TExames[]>('/retake/all', {}, token);
    };
    return getRetakes();
  } catch (error) {
    handleApiError(error);
  }
};
export const getRetakeAtaData = async (
  disciplineId: string,
  academicSemesterId: string,
): Promise<TRetakeAta> => {
  try {
    const token = await getUserToken();
    const getRetakes = async () => {
      'use cache';
      cacheTag(`retake-ata-${disciplineId}`);
      cacheLife('hours');
      return serverFetch<TRetakeAta>(
        `/retake/ata/${disciplineId}/${academicSemesterId}`,
        {},
        token,
      );
    };

    return getRetakes();
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllAtaDataByCourse = async (
  courseId: string,
  academicSemesterId: string,
): Promise<TAtaDiscipline[]> => {
  try {
    const token = await getUserToken();
    const getAtaDataByCourse = async () => {
      'use cache';
      cacheTag(`retake-ata-course-${courseId}`);
      cacheLife('hours');
      return serverFetch<TAtaDiscipline[]>(
        `/retake/all/course/${courseId}/${academicSemesterId}`,
        {},
        token,
      );
    };
    return getAtaDataByCourse();
  } catch (error) {
    handleApiError(error);
  }
};
export const getRetakeSectionsByDiscipline = async (
  disciplineId: string,
  academicSemesterId: string,
): Promise<TAtaDiscipline[]> => {
  try {
    const token = await getUserToken();
    const getRetakeSectionByDiscipline = async () => {
      'use cache';
      cacheTag(`retake-ata-discipline-${disciplineId}`);
      cacheLife('hours');
      return serverFetch<TAtaDiscipline[]>(
        `/retake/ata/${disciplineId}/${academicSemesterId}/sections`,
        {},
        token,
      );
    };
    return getRetakeSectionByDiscipline();
  } catch (error) {
    handleApiError(error);
  }
};
