import {
  TMarkSheet,
  TStudent,
  TStudentCourse,
  TStudentSchedule,
} from '@/types/global';
import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';
import { cacheLife, cacheTag } from 'next/cache';
import { getUserToken } from '@/lib/helper/auth/user';

export const getAllStudent = async (): Promise<TStudent[]> => {
  try {
    const token = await getUserToken();
    const getStudents = async () => {
      'use cache';
      cacheTag('students');
      cacheLife('hours');
      return serverFetch<TStudent[]>('/student', {}, token);
    };

    return getStudents();
  } catch (error) {
    handleApiError(error);
  }
};
export const getStudentMarks = async (
  studentId: string,
  academicSemesterId: string,
): Promise<TMarkSheet[]> => {
  try {
    const token = await getUserToken();
    const getStudentMark = async () => {
      'use cache';
      cacheTag(`student-marks-${studentId}`);
      cacheLife('hours');
      return serverFetch<TMarkSheet[]>(
        `/student/${studentId}/${academicSemesterId}`,
        {},
        token,
      );
    };

    return getStudentMark();
  } catch (error) {
    handleApiError(error);
  }
};
export const getStudentCourseInfo = async (
  studentId: string,
): Promise<TStudentCourse> => {
  try {
    const token = await getUserToken();
    const getStudentCourseInfos = async () => {
      'use cache';
      cacheTag(`student-course-info-${studentId}`);
      cacheLife('hours');
      return serverFetch<TStudentCourse>(`/my-courses/${studentId}`, {}, token);
    };
    return getStudentCourseInfos();
  } catch (error) {
    handleApiError(error);
  }
};
export const getStudentCourseSchedules = async (
  studentId: string,
): Promise<TStudentSchedule[]> => {
  try {
    const token = await getUserToken();
    const getStudentCourseSchedule = async () => {
      'use cache';
      cacheTag(`student-course-schedules-${studentId}`);
      cacheLife('hours');
      return serverFetch<TStudentSchedule[]>(
        `/my-course-schedules/${studentId}`,
        {},
        token,
      );
    };

    return getStudentCourseSchedule();
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllStudentDocList = async (
  filters: () => string,
): Promise<Response> => {
  const token = await getUserToken();
  try {
    const documentList = await serverFetch<Response>(
      `/export/student?${filters}`,
      {},
      token,
    );
    return documentList;
  } catch (error) {
    handleApiError(error);
  }
};
export const getSingleStudent = async (
  studentId: string,
): Promise<TStudent> => {
  try {
    const token = await getUserToken();
    const getStudent = async () => {
      'use cache';
      cacheTag(`student-${studentId}`);
      cacheLife('hours');
      return serverFetch<TStudent>(`/student/${studentId}`, {}, token);
    };

    return getStudent();
  } catch (error) {
    handleApiError(error);
  }
};
export const getStudentCouse = async (
  studentId: string,
): Promise<TStudentCourse[]> => {
  try {
    const token = await getUserToken();
    const getStudentCouses = async () => {
      'use cache';
      cacheTag(`student-course-${studentId}`);
      cacheLife('hours');
      return serverFetch<TStudentCourse[]>(
        `/my-courses/${studentId}`,
        {},
        token,
      );
    };
    return getStudentCouses();
  } catch (error) {
    handleApiError(error);
  }
};
