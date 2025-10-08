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
        next: { tags: ['academicFaculty'] },
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
      next: { tags: ['admitionExame'] },
    });
    return exames;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllSemester = async (): Promise<TSemester[]> => {
  try {
    const semester = await serverFetch<TSemester[]>('/academic-semester', {
      next: { tags: ['semester'] },
    });
    return semester;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllBuilding = async (): Promise<TBuilding[]> => {
  try {
    const building = await serverFetch<TBuilding[]>('/building', {
      next: { tags: ['building'] },
    });
    return building;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllRoom = async (): Promise<TRoom[]> => {
  try {
    const rooms = await serverFetch<TRoom[]>('/room', {
      next: { tags: ['room'] },
    });
    return rooms;
  } catch (error) {
    handleApiError(error);
  }
};
