import { RHPfetch, RHPResponse } from '../../config/apiWrapper';
import { REACT_APP_PROFILE_API } from '@env';

export const getAvatarForUser = async (userId: string, width: any) => {
  const response = await RHPfetch(
    `${REACT_APP_PROFILE_API}/profile/${userId}/avatar?width=${width}`,
    {
      method: 'GET',
    }
  );

  return await RHPResponse(response);
};

export const getProfileById = async (userId: string) => {
  const response = await RHPfetch(
    `${REACT_APP_PROFILE_API}/profile/${userId}`,
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

export const getProfileByIDPId = async (subId: string) => {
  console.log(
    `Calling profile API: ${REACT_APP_PROFILE_API}/profile/idp/${subId}`
  );
  const response = await fetch(
    `${REACT_APP_PROFILE_API}/profile/idp/${subId}`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    }
  );

  console.log('Response status: ', response.status);
  if (response.status === 200) {
    const profile = await response.json();

    console.log('Returned profile ID: ', profile.id);
    const profileResponse = await RHPfetch(
      `${REACT_APP_PROFILE_API}/profile/${profile.id}`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      }
    );
    return await RHPResponse(profileResponse);
  }

  return Promise.resolve({ status: response?.status, body: {} });
};
