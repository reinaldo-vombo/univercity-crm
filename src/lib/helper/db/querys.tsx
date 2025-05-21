import api from "@/lib/helper/api/axios";
import '@/lib/helper/api/axiosAuth';


export const addNewUser = async (body: any) => {
   await api.post('/auth/register', body)
}
export const deleteUser = async (id: string) => {

   await api.delete(`/users/${id}`)
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