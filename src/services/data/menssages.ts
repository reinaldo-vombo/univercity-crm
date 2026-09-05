import { serverEnv } from '@/config/env/server';
import { ApiResponseError } from '../../lib/errors/api-error';

export const messageDTO = {
  sendMessage: async (data: any) => {
    const response = await fetch(`${serverEnv.API_BASE_URL}/messages`, {
      method: 'POST',
      body: data,
    });

    const json = await response.json();
    if (!response || json?.success === false) {
      throw new ApiResponseError(
        response.status,
        json?.message || 'Request failed',
      );
    }
    return json;
  },
  toMessageList: async (recipientId: string, channel: string) => {
    const response = await fetch(
      `${serverEnv.API_BASE_URL}/messages?recipientId=${recipientId}&?channel=${channel}`,
      {
        method: 'GET',
        body: null,
      },
    );

    const json = await response.json();
    if (!response || json?.success === false) {
      throw new ApiResponseError(
        response.status,
        json?.message || 'Request failed',
      );
    }
    return json;
  },
};
