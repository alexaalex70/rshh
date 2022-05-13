import { RHPfetch, RHPResponse } from '../../config/apiWrapper';
import { REACT_APP_CHANNEL_API } from '@env';

// TODO: Create types for the calls
// Observation: These API calls are not yet used anywhere so this is low priority at the moment (21.12.2021)

export const getChannels = async () => {
  const response = await RHPfetch(`${REACT_APP_CHANNEL_API}/channel`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  });

  return await RHPResponse(response);
};

export const getChannelById = async (channelId: string) => {
  const response = await RHPfetch(
    `${REACT_APP_CHANNEL_API}/channel/${channelId}`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    }
  );

  return await RHPResponse(response);
};

export const patchChannelAccessState = async (channelId: string, body: any) => {
  const response = await RHPfetch(
    `${REACT_APP_CHANNEL_API}/channel/${channelId}/accessState`,
    {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify(body),
    }
  );

  return await RHPResponse(response);
};
