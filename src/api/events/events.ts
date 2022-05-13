import { RHPfetch, RHPResponse } from '../../config/apiWrapper';
import { REACT_APP_EVENT_API } from '@env';

export const getEvents = async (): Promise<{ events: any }> => {
  const response = await RHPfetch(`${REACT_APP_EVENT_API}/event`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  });

  return await RHPResponse(response);
};

export const getEventByUserId = async (
  userId: string
): Promise<{ events: any }> => {
  const response = await RHPfetch(
    `${REACT_APP_EVENT_API}/event?user_id=${userId}`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    }
  );

  const result = await RHPResponse(response);
  return result?.body;
};

export const deleteEvent = async (
  eventId: string
): Promise<{ events: any }> => {
  const response = await RHPfetch(`${REACT_APP_EVENT_API}/event/${eventId}`, {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  });

  return await RHPResponse(response);
};

export const patchEvent = async (eventId: string, body: any) => {
  const response = await RHPfetch(`${REACT_APP_EVENT_API}/event/${eventId}`, {
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
    body: JSON.stringify(body),
  });

  return await RHPResponse(response);
};
