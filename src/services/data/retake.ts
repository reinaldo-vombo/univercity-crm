import { REVALIDATION } from '@/constants/relalidation';
import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';
import {
  TAtaDiscipline,
  TExames,
  TExameStatemant,
  TRetakeAta,
} from '@/types/global';

export const getAllExameStateman = async (): Promise<TExameStatemant[]> => {
  try {
    const statemant = await serverFetch<TExameStatemant[]>(
      '/retake/statemants',
      {
        next: { tags: ['exame-satateman'], revalidate: REVALIDATION.ONE_HOUR },
      },
    );
    return statemant;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllRetakes = async (): Promise<TExames[]> => {
  try {
    const statemant = await serverFetch<TExames[]>('/retake/all', {
      next: {
        tags: ['retake-exame'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.ONE_HOUR : 0,
      },
    });
    return statemant;
  } catch (error) {
    handleApiError(error);
  }
};
export const getRetakeAtaData = async (
  disciplineId: string,
  academicSemesterId: string,
): Promise<TRetakeAta> => {
  try {
    const statemant = await serverFetch<TRetakeAta>(
      `/retake/ata/${disciplineId}/${academicSemesterId}`,
      {
        next: {
          tags: ['retake-ata'],
          revalidate:
            process.env.NODE_ENV === 'production' ? REVALIDATION.ONE_HOUR : 0,
        },
      },
    );
    return statemant;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllAtaDataByCourse = async (
  courseId: string,
  academicSemesterId: string,
): Promise<TAtaDiscipline[]> => {
  try {
    const statemant = await serverFetch<TAtaDiscipline[]>(
      `/retake/all/course/${courseId}/${academicSemesterId}`,
      {
        next: {
          tags: ['retake-ata-course'],
          revalidate:
            process.env.NODE_ENV === 'production' ? REVALIDATION.ONE_HOUR : 0,
        },
      },
    );
    return statemant;
  } catch (error) {
    handleApiError(error);
  }
};
export const getRetakeSectionsByDiscipline = async (
  disciplineId: string,
  academicSemesterId: string,
): Promise<TAtaDiscipline[]> => {
  try {
    const statemant = await serverFetch<TAtaDiscipline[]>(
      `/retake/ata/${disciplineId}/${academicSemesterId}/sections`,
      {
        next: {
          tags: ['retake-ata-discipline'],
          revalidate:
            process.env.NODE_ENV === 'production' ? REVALIDATION.ONE_HOUR : 0,
        },
      },
    );
    return statemant;
  } catch (error) {
    handleApiError(error);
  }
};
