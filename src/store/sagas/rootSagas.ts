import { all } from 'redux-saga/effects';
import questionSetSagas from './questionSetSaga/questionSetSaga';
import stackSagas from './stackSaga/stackSaga';
import questionSetInfoSagas from './questionSetInfoSaga/questionSetInfoSaga';
import profileSagas from './profileSaga/profileSaga';
import userInfoSagas from './userSage/userSaga';
import eventsSaga from './eventsSaga/eventsSaga';
import navigationSagas from './navigationSaga/navigationSaga';

export default function* rootSaga() {
  yield all([
    ...questionSetSagas,
    ...stackSagas,
    ...questionSetInfoSagas,
    ...profileSagas,
    ...userInfoSagas,
    ...eventsSaga,
    ...navigationSagas,
  ]);
}
