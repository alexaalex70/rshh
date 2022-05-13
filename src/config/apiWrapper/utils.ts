import { RootState } from '../../store/reducers/rootReducer';

export const isValidResponse = (response: any) => {
  return response?.status >= 200 && response?.status < 300;
};

export const isErrorResponse = (response: any) => {
  return response?.status >= 400 && response?.status < 600;
};

export const showCurl = (url: string, options: any) => {
  console.log(
    `----- CURL------: curl -v -X ${
      options?.method
    } -H 'Authorization: ${options?.headers?.get('Authorization')}' ${
      options.body ? "-d '" + options.body + "'" : ''
    } '${url}'`
  );
};

export const processHeaders = (options: any, state: RootState) => {
  if (options?.headers) {
    console.log('Decorated request with access Token');
    options.headers.set('Authorization', 'Bearer ' + state.user.token);
  }
};
