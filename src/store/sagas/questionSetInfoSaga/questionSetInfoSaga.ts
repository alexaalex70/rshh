import { fork, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/questionSetInfo/questionSetInfo';
import { Types } from '../../models/actionTypes/questionSetInfoTypes';

function* updateQuestionSetInformation({ payload }: any) {
  try {
    yield put(
      actions.successQuestionSetInformation({
        hint: payload.hint,
        questionIndex: payload.questionIndex,
      })
    );
  } catch {}
}

function* watchUpdateQuestionSetInformation() {
  yield takeEvery(
    Types.UPDATE_QUESTIONSET_INFORMATION,
    updateQuestionSetInformation
  );
}

function* updateHint({ payload }: any) {
  try {
    yield put(
      actions.successUpdateHint({
        hintStatus: payload.hintStatus,
      })
    );
  } catch {}
}

function* watchUpdateHint() {
  yield takeEvery(Types.UPDATE_HINT_STATUS, updateHint);
}

const questionSetInfoSagas = [
  fork(watchUpdateQuestionSetInformation),
  fork(watchUpdateHint),
];

export default questionSetInfoSagas;
