import urlOpener from './urlOpener';
import {
  REACT_APP_COGNITO_URL,
  REACT_APP_USER_POOL_ID,
  REACT_APP_CLIENT_ID,
} from '@env';

console.log(
  'AWS Parameters: ',
  REACT_APP_CLIENT_ID,
  REACT_APP_COGNITO_URL,
  REACT_APP_USER_POOL_ID
);

export const awsmobile = {
  region: 'eu-west-2',
  userPoolId: REACT_APP_USER_POOL_ID,
  userPoolWebClientId: REACT_APP_CLIENT_ID,
  oauth: {
    domain: REACT_APP_COGNITO_URL,
    scope: ['openid', 'phone'],
    responseType: 'code',
    redirectSignIn: 'resethealth://Welcome',
    redirectSignOut: 'resethealth://Welcome',
    urlOpener,
  },
};
