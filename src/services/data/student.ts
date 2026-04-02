import { TMarkSheet, TStudent, TStudentCourse } from '@/types/global';
import { handleApiError } from '../error-handler';
import { serverFetch } from '../server-fetch';
import { REVALIDATION } from '@/constants/relalidation';

export const getAllStudent = async (): Promise<TStudent[]> => {
  try {
    const students = await serverFetch<TStudent[]>('/student', {
      next: {
        tags: ['student'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.FIVE_MINUTES : 0,
      },
    });
    return students;
  } catch (error) {
    handleApiError(error);
  }
};
export const getStudentMarks = async (
  studentId: string,
  academicSemesterId: string,
): Promise<TMarkSheet[]> => {
  try {
    const marks = await serverFetch<TMarkSheet[]>(
      `/student/${studentId}/${academicSemesterId}`,
      {
        next: {
          tags: ['student-marks'],
          revalidate:
            process.env.NODE_ENV === 'production'
              ? REVALIDATION.FIVE_MINUTES
              : 0,
        },
      },
    );
    return marks;
  } catch (error) {
    handleApiError(error);
  }
};
export const getStudentCourseInfo = async (
  studentId: string,
): Promise<TStudentCourse> => {
  try {
    const marks = await serverFetch<TStudentCourse>(
      `/my-courses/${studentId}`,
      {
        next: {
          tags: ['student-course-info'],
          revalidate:
            process.env.NODE_ENV === 'production'
              ? REVALIDATION.FIVE_MINUTES
              : 0,
        },
      },
    );
    return marks;
  } catch (error) {
    handleApiError(error);
  }
};
export const getStudentCourseSchedules = async (
  studentId: string,
): Promise<TStudent[]> => {
  try {
    const marks = await serverFetch<TStudent[]>(
      `/my-course-schedules/${studentId}`,
      {
        next: {
          tags: ['student-course-info'],
          revalidate:
            process.env.NODE_ENV === 'production'
              ? REVALIDATION.FIVE_MINUTES
              : 0,
        },
      },
    );
    return marks;
  } catch (error) {
    handleApiError(error);
  }
};
export const getAllStudentDocList = async (
  filters: () => string,
): Promise<Response> => {
  try {
    const documentList = await serverFetch<Response>(
      `/export/student?${filters}`,
    );
    return documentList;
  } catch (error) {
    handleApiError(error);
  }
};
export const getSingleStudent = async (
  studentId: string,
): Promise<TStudent[]> => {
  try {
    const student = await serverFetch<TStudent[]>(`/student/${studentId}`, {
      next: {
        tags: ['student'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.ONE_HOUR : 0,
      },
    });
    return student;
  } catch (error) {
    handleApiError(error);
  }
};
export const getStudentCouse = async (
  studentId: string,
): Promise<TStudent[]> => {
  try {
    const student = await serverFetch<TStudent[]>(`/my-courses/${studentId}`, {
      next: {
        tags: ['student-course'],
        revalidate:
          process.env.NODE_ENV === 'production' ? REVALIDATION.ONE_HOUR : 0,
      },
    });
    return student;
  } catch (error) {
    handleApiError(error);
  }
};
