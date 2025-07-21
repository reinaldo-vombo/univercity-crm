

import { handleApiError } from "@/services/error-handler";
import { serverFetch } from "@/services/server-fetch";
import { TAcademicFaculty, TAdmitionExame, TBuilding, TCourse, TCoursePrice, TDepartemant, TDiscipline, TEvents, TFaculty, TOfferedCourse, TRoom, TSemester, TUser } from "@/types/global";



export const getAllUsers = async (): Promise<TUser[]> => {
   try {
      const users = await serverFetch<TUser[]>('/users', {
         next: { tags: ['users'] },
      })
      return users;
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllFalculty = async (): Promise<TFaculty[]> => {
   try {
      const faculty = await serverFetch<TFaculty[]>('/faculty', {
         next: { tags: ['faculty'] },
      })
      return faculty;
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllCurses = async (): Promise<TCourse[]> => {
   try {
      const curses = await serverFetch<TCourse[]>('/course', {
         next: { tags: ['curse'] }, // 🚀 tags for smart revalidation
      });
      return curses;
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllDepartments = async (): Promise<TDepartemant[]> => {
   try {
      const departements = await serverFetch<TDepartemant[]>('/academic-department', {
         next: { tags: ['departement'] },
      })
      return departements;
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllAcademicFaculty = async (): Promise<TAcademicFaculty[]> => {
   try {
      const AacademicFaculty = await serverFetch<TAcademicFaculty[]>('/academic-faculty', {
         next: { tags: ['academicFaculty'] },
      })
      return AacademicFaculty;
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllAdmitionExames = async (): Promise<TAdmitionExame[]> => {
   try {
      const exames = await serverFetch<TAdmitionExame[]>('/admission-exame', {
         next: { tags: ['admitionExame'] },
      })
      return exames;
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllSemester = async (): Promise<TSemester[]> => {
   try {
      const semester = await serverFetch<TSemester[]>('/academic-semester', {
         next: { tags: ['semester'] },
      })
      return semester;
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllOfferedCourse = async (): Promise<TOfferedCourse[]> => {
   try {
      const semester = await serverFetch<TOfferedCourse[]>('/offered-course', {
         next: { tags: ['offeredCourse'] },
      })
      return semester;
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllCoursePrice = async (): Promise<TCoursePrice[]> => {
   try {
      const prices = await serverFetch<TCoursePrice[]>('/course-price', {
         next: { tags: ['coursePrice'] },
      })
      return prices;
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllDiscipline = async (): Promise<TDiscipline[]> => {
   try {
      const discipline = await serverFetch<TDiscipline[]>('/discipline', {
         next: { tags: ['discipline'] },
      })
      return discipline;
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllEvents = async (): Promise<TEvents[]> => {
   try {
      const events = await serverFetch<TEvents[]>('/events', {
         next: { tags: ['events'] },
      })
      return events;
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllBuilding = async (): Promise<TBuilding[]> => {
   try {
      const building = await serverFetch<TBuilding[]>('/building', {
         next: { tags: ['building'] },
      })
      return building;
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllRoom = async (): Promise<TRoom[]> => {
   try {
      const rooms = await serverFetch<TRoom[]>('/room', {
         next: { tags: ['room'] },
      })
      return rooms;
   } catch (error) {
      handleApiError(error);
   }
};
