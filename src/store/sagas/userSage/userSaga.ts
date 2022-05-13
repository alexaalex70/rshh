import { fork, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/user/user';
import { Types } from '../../models/actionTypes/userTypes';

function* updateUserInformation({ payload }: any) {
  try {
    yield put(
      actions.userUpdateSuccess({
        id: payload.id,
        subId: payload.subId,
        idpKey: payload.idpKey,
        phoneNumber: payload.phoneNumber,
        isLogged: payload.isLogged,
        isLoading: payload.isLoading,
        token: payload.token,
        refreshToken: payload.refreshToken,
      })
    );
  } catch (e) {
    console.log(e);
  }
}

function* watchUpdateUserInformation() {
  yield takeEvery(Types.UPDATE_USER_INFORMATION, updateUserInformation);
}

const userInfoSagas = [fork(watchUpdateUserInformation)];

export default userInfoSagas;
