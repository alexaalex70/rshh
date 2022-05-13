import { fork, takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../../../api/questionSet/questionSet';
import * as actions from '../../actions/questionSet/questionSet';
import { Types } from '../../models/actionTypes/questionSetTypes';
import { QuestionSet } from '../../../types/questionSet/Question/QuestionSet';

function* fetchQuestionSetById({ payload }: any) {
  try {
    const response: QuestionSet = yield call(
      api.getQuestionSetById,
      payload.questionId
    );
    yield put(
      actions.fetchQuestionSetSuccess({
        questionSet: response,
      })
    );
  } catch (e) {
    yield put(
      actions.questionSetError({
        error: 'An error occurred when trying to get the question set by id.',
      })
    );
  }
}

function* watchQuestionSetRequest() {
  yield takeEvery(Types.GET_QUESTIONSET_REQUEST, fetchQuestionSetById);
}

function* patchQuestionSetById({ payload }: any) {
  try {
    const response: QuestionSet = yield call(
      api.patchQuestionSetById,
      payload.questionSetId,
      payload.body
    );

    yield put(
      actions.fetchQuestionSetSuccess({
        questionSet: response,
      })
    );
  } catch (e) {
    yield put(
      actions.questionSetError({
        error: 'An error occurred when trying to patch question set',
      })
    );
  }
}

function* watchQuestionSetPatch() {
  yield takeLatest(Types.PATCH_QUESTIONSET_REQUEST, patchQuestionSetById);
}

const questionSetSagas = [
  fork(watchQuestionSetRequest),
  fork(watchQuestionSetPatch),
];

export default questionSetSagas;
