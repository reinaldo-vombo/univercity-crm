import { REVALIDATION } from '@/constants/relalidation';
import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';
import {
  TClassShedule,
  TOfferedCourse,
  TOfferedCourseSection,
} from '@/types/global';

export const getAllSections = async (): Promise<TOfferedCourseSection[]> => {
  try {
    const section = await serverFetch<TOfferedCourseSection[]>(
      '/offered-course-section',
      {
        next: {
          tags: ['offered-course-section'],
          revalidate:
            process.env.NODE_ENV === 'production'
              ? REVALIDATION.FIVE_MINUTES
              : 0,
        },
      },
    );

    return section;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllOfferedCourse = async (): Promise<TOfferedCourse[]> => {
  try {
    const section = await serverFetch<TOfferedCourse[]>('/offered-course', {
      next: {
        tags: ['offered-course'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.FIVE_MINUTES : 0,
      },
    });
    return section;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllOfferedCourseClassShedule = async (): Promise<
  TClassShedule[]
> => {
  try {
    const section = await serverFetch<TClassShedule[]>(
      '/offered-course-class-schedule',
      {
        next: {
          tags: ['offered-course-class-schedule'],
          revalidate:
            process.env.NODE_ENV === 'production'
              ? REVALIDATION.FIVE_MINUTES
              : 0,
        },
      },
    );
    return section;
  } catch (error) {
    handleApiError(error);
  }
};
