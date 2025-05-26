

import { TCurse } from "@/lib/types/global";
import { handleApiError } from "../api/error-handler";
import { serverFetch } from "../api/server-fetch";


export const getAllCurses = async (): Promise<TCurse[]> => {
   try {
      const curses = await serverFetch<TCurse[]>('/academic-faculty', {
         next: { tags: ['curse'] }, // 🚀 tags for smart revalidation
      });
      return curses
   } catch (error) {
      handleApiError(error);
   }
};
