
import { handleApiError } from "@/services/error-handler";
import { serverFetch } from "@/services/server-fetch";
import { TEvents } from "@/types/global";


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


