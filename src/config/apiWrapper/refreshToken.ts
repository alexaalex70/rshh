import { store } from '../../App';
import { updateUserInformation } from '../../store/actions';
import { isValidResponse } from './utils';
import { REACT_APP_CLIENT_ID, REACT_APP_COGNITO_URL } from '@env';
import { UpdateUserInformationPayload } from '../../store/models/types/userTypes';
import { RootState } from '../../store/reducers/rootReducer';

let refreshTokenPromise: Promise<boolean> | null = null;

const fetchRefreshToken = async (refreshToken: any): Promise<Response> => {
  const url = 'https://' + REACT_APP_COGNITO_URL + '/oauth2/token';
  const body =
    'grant_type=refresh_token&client_id=' +
    REACT_APP_CLIENT_ID +
    '&refresh_token=' +
    refreshToken;

  console.log(
    `----- REFRESH TOKEN CURL------: curl -v -X POST -H 'Content-Type: application/x-www-form-urlencoded' -d '${body}' '${url}'`
  );
  return fetch(url, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/x-www-form-urlencoded',
    }),
    body: body,
  })
    .then((response) => {
      console.log('REFRESH TOKEN RESPONSE: ', response);
      return response;
    })
    .catch((err) => {
      console.log('REFRESH TOKEN ERROR: ', err);
      // TODO fix
      return Promise.resolve({
        status: err?.status,
        body: {},
      } as unknown as Response);
    });
};

const getRefreshTokenPromise = (state: RootState) => {
  if (refreshTokenPromise) return refreshTokenPromise;

  refreshTokenPromise = fetchRefreshToken(state.user.refreshToken).then(
    async (token) => {
      console.log('token:', token);
      if (isValidResponse(token)) {
        const result = await token.json();
        console.log('New access token response: ', result);

        store.dispatch(
          updateUserInformation({
            ...(state.user as UpdateUserInformationPayload),
            token: result.access_token,
          })
        );
        refreshTokenPromise = null;
        return true;
      } else {
        console.error('Refresh token failed: ', token);
        refreshTokenPromise = null;
        return false;
      }
    }
  );
  return refreshTokenPromise;
};

export const refreshToken = async (): Promise<boolean> => {
  console.log('Unauthorized');
  const state = store.getState();
  return getRefreshTokenPromise(state);
};
