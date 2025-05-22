import api from "@/lib/helper/api/axios";
import '@/lib/helper/api/axiosAuth';
import { ApiResponse, TCurse, TUser } from "@/lib/types/global";
import { handleApiError } from "../api/error-handler";


export const addNewUser = async (body: Partial<TUser>): Promise<TUser> => {
   try {
      const response = await api.post<ApiResponse<TUser>>('/auth/register', body);
      return response.data.data;
   } catch (error) {
      handleApiError(error);
   }
};
export const addCurse = async (body: Partial<TCurse>): Promise<TCurse> => {
   try {
      const response = await api.post<ApiResponse<TCurse>>('/academic-faculty', body);
      return response.data.data;
   } catch (error) {
      handleApiError(error);
   }
};
export const deleteCurse = async (id: string) => {
   try {
      const response = await api.post<ApiResponse<TCurse>>(`/academic-faculty/${id}`);
      return response.data.data;
   } catch (error) {
      handleApiError(error);
   }
};

export const deleteUser = async (id: string): Promise<void> => {
   try {
      await api.delete(`/users/${id}`);
   } catch (error) {
      handleApiError(error);
   }
};

export const getAllUser = async (): Promise<TUser[]> => {
   try {
      const result = await api.get<ApiResponse<TUser[]>>('/users');
      return result.data.data;
   } catch (error) {
      handleApiError(error);
   }
};

export const getSingleUser = async (id: string): Promise<TUser> => {
   try {
      const result = await api.get<ApiResponse<TUser>>(`/users/${id}`);
      return result.data.data;
   } catch (error) {
      handleApiError(error);
   }
};
export const getAllCurses = async (): Promise<TCurse[]> => {
   try {
      const result = await api.get<ApiResponse<TCurse[]>>('/academic-faculty');
      return result.data.data;
   } catch (error) {
      handleApiError(error);
   }
};