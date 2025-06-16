

import { TAcademicFaculty, TAdmitionExame, TCourse, TDepartemant, TSemester, TUser } from "@/lib/types/global";
import { handleApiError } from "../api/error-handler";
import { serverFetch } from "../api/server-fetch";


export const getAllUsers = async (): Promise<TUser[]> => {
   try {
      const curses = await serverFetch<TUser[]>('/users', {
         next: { tags: ['users'] },
      })
      return curses
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllCurses = async (): Promise<TCourse[]> => {
   try {
      const curses = await serverFetch<TCourse[]>('/academic-faculty', {
         next: { tags: ['curse'] }, // 🚀 tags for smart revalidation
      });
      return curses
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllDepartments = async (): Promise<TDepartemant[]> => {
   try {
      const departements = await serverFetch<TDepartemant[]>('/academic-department', {
         next: { tags: ['departement'] },
      })
      return departements
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllAcademicFaculty = async (): Promise<TAcademicFaculty[]> => {
   try {
      const AacademicFaculty = await serverFetch<TAcademicFaculty[]>('/academic-faculty', {
         next: { tags: ['academicFaculty'] },
      })
      return AacademicFaculty
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllAdmitionExames = async (): Promise<TAdmitionExame[]> => {
   try {
      const exames = await serverFetch<TAdmitionExame[]>('/admission-exame', {
         next: { tags: ['admitionExame'] },
      })
      return exames
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
