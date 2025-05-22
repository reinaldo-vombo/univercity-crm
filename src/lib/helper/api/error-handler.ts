import { FLASH_MESSAGE } from '@/constants/flash-message';
import { AxiosError } from 'axios';

export function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    if (error.response) {
      // Server responded with status code out of 2xx range
      throw new Error(
        `API Error (${error.response.status}): ${
          (error.response.data as any)?.message || error.message
        }`
      );
    } else if (error.request) {
      // Request made but no response received
      throw new Error(FLASH_MESSAGE.SERVER_ERROR_500);
    } else {
      // Something went wrong in setting up the request
      throw new Error(`Axios Error: ${error.message}`);
    }
  } else {
    throw new Error(FLASH_MESSAGE.UNESPECTED_ERROR);
  }
}
