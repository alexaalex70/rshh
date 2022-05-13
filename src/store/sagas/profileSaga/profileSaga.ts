// @ts-nocheck
import { fork, call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../../../api/profile/profile';
import * as actions from '../../actions/profile/profile';
import { Types } from '../../models/actionTypes/profileTypes';

function* fetchProfileById({ payload }: any) {
  try {
    const response = yield call(api.getProfileById, payload.userId);
    yield put(
      actions.fetchProfileSuccess({
        profile: response,
        impersonate: payload.impersonate,
      })
    );
  } catch (e) {
    yield put(
      actions.profileError({
        error: `An error occurred when trying to get the profile by id. ${e}`,
      })
    );
  }
}

function* watchProfileByIdRequest() {
  yield takeEvery(Types.FETCH_PROFILE_FOR_ID, fetchProfileById);
}

function* fetchProfileByIDPId({ payload }: any) {
  try {
    const response = yield call(api.getProfileByIDPId, payload.userId);
    yield put(
      actions.fetchProfileSuccess({
        profile: response,
        impersonate: payload.impersonate,
      })
    );
  } catch (e) {
    yield put(
      actions.profileError({
        error: `An error occurred when trying to get the profile by id. ${e}`,
      })
    );
  }
}

function* watchProfileByIDPIdRequest() {
  yield takeEvery(Types.FETCH_PROFILE_FOR_IDP_ID, fetchProfileByIDPId);
}

const profileSaga = [
  fork(watchProfileByIdRequest),
  fork(watchProfileByIDPIdRequest),
];

export default profileSaga;
