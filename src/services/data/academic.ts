import { cacheTag, cacheLife } from 'next/cache';
import { handleApiError } from '@/services/error-handler';
import { serverFetch } from '@/services/server-fetch';
import {
  TAcademicFaculty,
  TAdmitionExame,
  TAdmitionExameFase,
  TBuilding,
  TRoom,
  TSemester,
  TSemesterRegistration,
} from '@/types/global';
import { getUserToken } from '@/lib/helper/auth/user';

export const getAllAcademicFaculty = async (): Promise<TAcademicFaculty[]> => {
  const token = await getUserToken();
  try {
    const getAcademicFaculty = async () => {
      'use cache';
      cacheTag('academicFaculty');
      cacheLife('hours');
      return serverFetch<TAcademicFaculty[]>('/academic-faculty', {}, token);
    };

    return getAcademicFaculty();
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllAdmitionExames = async (): Promise<TAdmitionExame[]> => {
  const token = await getUserToken();
  try {
    const getAdmitionExames = async () => {
      'use cache';
      cacheTag('admitionExame');
      cacheLife('hours');
      return serverFetch<TAdmitionExame[]>('/admission-exame', {}, token);
    };
    return getAdmitionExames();
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllAdmitionExamesFase = async (): Promise<
  TAdmitionExameFase[]
> => {
  const token = await getUserToken();
  const getAdmitionExamesFase = async () => {
    'use cache';
    cacheTag('admitionExameFase');
    cacheLife('hours');
    return serverFetch<TAdmitionExameFase[]>(
      '/admission-exame/fases',
      {},
      token,
    );
  };
  try {
    return getAdmitionExamesFase();
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllSemester = async (): Promise<TSemester[]> => {
  try {
    const token = await getUserToken();
    const getSemester = async () => {
      'use cache';
      cacheTag('semester');
      cacheLife('hours');
      return serverFetch<TSemester[]>('/academic-semester', {}, token);
    };

    return getSemester();
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllSemesterRegistration = async (): Promise<
  TSemesterRegistration[]
> => {
  try {
    const token = await getUserToken();
    const getSemester = async () => {
      'use cache';
      cacheTag('semester-registration');
      cacheLife('hours');
      return serverFetch<TSemesterRegistration[]>(
        '/semester-registration',
        {},
        token,
      );
    };
    return getSemester();
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllBuilding = async (): Promise<TBuilding[]> => {
  try {
    const token = await getUserToken();
    const getSemester = async () => {
      'use cache';
      cacheTag('buildings');
      cacheLife('hours');
      return serverFetch<TBuilding[]>('/building', {}, token);
    };
    return getSemester();
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllRoom = async (): Promise<TRoom[]> => {
  try {
    const token = await getUserToken();
    const getRooms = async () => {
      'use cache';
      cacheTag('rooms');
      cacheLife('hours');
      return serverFetch<TRoom[]>('/room', {}, token);
    };

    return getRooms();
  } catch (error) {
    handleApiError(error);
  }
};
