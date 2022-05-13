import { store } from '../../App';
import { refreshToken } from './refreshToken';
import { processHeaders, showCurl } from './utils';

export const RHPResponse = (response) => {
  if (!response?.json) {
    console.log('There is no response body');
    return Promise.resolve({ status: response?.status, body: {} });
  }
  return response
    ?.json()
    .then((body) => {
      const result = { status: response?.status, body: body };
      console.log('RESULT: ', result);
      return result;
    })
    .catch(() => {
      return Promise.resolve({ status: response?.status, body: {} });
    });
  // else throw new Error('Something went wrong during API call: status:' + response?.status);
};

export const RHPfetch = async (url, options) => {
  console.log('RHPfetch: ', url, options);
  processHeaders(options, store.getState());
  showCurl(url, options);
  return await fetch(url, options)
    .then(async (res) => {
      let apiResult = res;
      if (res.status === 401) {
        const tokenRefreshSuccess = await refreshToken();
        if (tokenRefreshSuccess) {
          processHeaders(options, store.getState());
          showCurl(url, options);
          apiResult = await fetch(url, options);
        }
      }

      console.log('API call result: [' + apiResult.status + ']', apiResult);
      return apiResult;
    })
    .catch((err) => console.error(err));
};
