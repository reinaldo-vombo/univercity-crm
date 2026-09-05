import { getUserToken } from '@/lib/helper/auth/user';
import { serverFetch } from '../server-fetch';
import {
  TClassShedule,
  TOfferedCourse,
  TOfferedCourseSection,
} from '@/types/global';
import { cacheLife, cacheTag } from 'next/cache';
import { handleApiError } from '../error-handler';

export const getAllSections = async (): Promise<TOfferedCourseSection[]> => {
  try {
    const token = await getUserToken();
    const getASections = async () => {
      'use cache';
      cacheTag('offered-course-section');
      cacheLife('hours');
      return serverFetch<TOfferedCourseSection[]>(
        '/offered-course-section',
        {},
        token,
      );
    };

    return getASections();
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllOfferedCourse = async (): Promise<TOfferedCourse[]> => {
  try {
    const token = await getUserToken();
    const getOfferedCourse = async () => {
      'use cache';
      cacheTag('offered-course');
      cacheLife('hours');
      return serverFetch<TOfferedCourse[]>('/offered-course', {}, token);
    };
    return getOfferedCourse();
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllOfferedCourseClassShedule = async (): Promise<
  TClassShedule[]
> => {
  try {
    const token = await getUserToken();
    const getOfferedCourseClassShedule = async () => {
      'use cache';
      cacheTag('offered-course-class-schedule');
      cacheLife('hours');
      return serverFetch<TClassShedule[]>(
        '/offered-course-class-schedule',
        {},
        token,
      );
    };

    return getOfferedCourseClassShedule();
  } catch (error) {
    handleApiError(error);
  }
};
