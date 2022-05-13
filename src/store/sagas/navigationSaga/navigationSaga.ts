import { fork, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/navigation/navigation';
import { Types } from '../../models/actionTypes/navigationTypes';

function* updateNavigationInformation({ payload }: any) {
  try {
    yield put(
      actions.navigationSuccess({
        navigationId: payload.navigationId,
      })
    );
  } catch (e) {
    console.log(e);
  }
}

function* watchUpdateNavigationInformation() {
  yield takeEvery(
    Types.UPDATE_NAVIGATION_INFORMATION,
    updateNavigationInformation
  );
}

const navigationSagas = [fork(watchUpdateNavigationInformation)];

export default navigationSagas;
