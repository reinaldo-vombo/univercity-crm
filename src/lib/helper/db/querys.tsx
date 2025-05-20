import api from "@/lib/helper/api/axios";
import '@/lib/helper/api/axiosAuth';


export const createUser = async (body: any) => {
   const result = await api.post('/users/', body)
   return result.data;
}

export const getAllUser = async () => {
   try {
      const result = await api.get('/users');
      return result.data.data;
   } catch (error) {
      console.error('Error fetching users:', error);  // Log the error for debugging
      return { error: 'Failed to fetch users.' };    // Return a user-friendly error message
   }
}

export const getSingleUser = async (id: string) => {
   const result = await api.get(`/users/${id}`)
   return result.data.data
}