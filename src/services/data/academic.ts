import { REVALIDATION } from '@/constants/mock-data';
import { handleApiError } from '@/services/error-handler';
import { serverFetch } from '@/services/server-fetch';
import {
  TAcademicFaculty,
  TAdmitionExame,
  TBuilding,
  TRoom,
  TSemester,
} from '@/types/global';

export const getAllAcademicFaculty = async (): Promise<TAcademicFaculty[]> => {
  try {
    const AacademicFaculty = await serverFetch<TAcademicFaculty[]>(
      '/academic-faculty',
      {
        next: {
          tags: ['academicFaculty'],
          revalidate:
            process.env.NODE_ENV === 'production'
              ? REVALIDATION.FIVE_MINUTES
              : 0,
        },
      }
    );
    return AacademicFaculty;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllAdmitionExames = async (): Promise<TAdmitionExame[]> => {
  try {
    const exames = await serverFetch<TAdmitionExame[]>('/admission-exame', {
      next: {
        tags: ['admitionExame'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.FIVE_MINUTES : 0,
      },
    });
    return exames;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllSemester = async (): Promise<TSemester[]> => {
  try {
    const semester = await serverFetch<TSemester[]>('/academic-semester', {
      next: {
        tags: ['semester'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.FIVE_MINUTES : 0,
      },
    });
    return semester;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllBuilding = async (): Promise<TBuilding[]> => {
  try {
    const building = await serverFetch<TBuilding[]>('/building', {
      next: {
        tags: ['building'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.FIVE_MINUTES : 0,
      },
    });
    return building;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllRoom = async (): Promise<TRoom[]> => {
  try {
    const rooms = await serverFetch<TRoom[]>('/room', {
      next: {
        tags: ['room'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.FIVE_MINUTES : 0,
      },
    });
    return rooms;
  } catch (error) {
    handleApiError(error);
  }
};
