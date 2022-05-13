import React, { useEffect, useState } from 'react';
import Navigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import SplashScreen from 'react-native-splash-screen';
import { awsmobile } from './config/aws-exports';
import Amplify, { Auth } from 'aws-amplify';
import jwt_decode from 'jwt-decode';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store/reducers/rootReducer';
import rootSaga from './store/sagas/rootSagas';

Amplify.configure(awsmobile);

TimeAgo.addDefaultLocale(en);

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

const App = () => {
  // return <StorybookUIRoot />
  const queryClient = new QueryClient();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((userData) => {
        console.log(userData);
        const decodeToken: any = jwt_decode(
          userData.signInUserSession.accessToken.jwtToken
        );
        console.log(userData);
        setUserInfo({
          isLoading: false,
          isLogged: true,
          id: decodeToken.client_id,
          phoneNumber: userData.signInUserSession.idToken.payload.phone_number,
          subId: decodeToken.sub,
          idpKey: userData.signInUserSession.idToken.payload.sub,
          token: userData.signInUserSession.accessToken.jwtToken,
          refreshToken: userData.signInUserSession.refreshToken.token,
        });
        SplashScreen.hide();
      })
      .catch(() => {
        setUserInfo({
          isLoading: false,
          isLogged: false,
          phoneNumber: '',
          id: '',
          subId: '',
          idpKey: '',
          token: '',
          refreshToken: '',
        });
        SplashScreen.hide();
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Navigator userInfo={userInfo} />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
