import { fork, call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../../../api/stacks/stacks';
import * as actions from '../../actions/stacks/stacks';
import { Types } from '../../models/actionTypes/stacksTypes';
import { Stack } from '../../../types/stacks/Stack/Stack';

function* fetchStackById({ payload }: any) {
  try {
    const response: Stack = yield call(api.getStackById, payload.stackId);
    yield put(
      actions.fetchStackSuccess({
        stack: response,
      })
    );
  } catch (e) {
    yield put(
      actions.stackError({
        error: 'An error occured when trying to get the stack by id.',
      })
    );
  }
}

function* watchStackRequest() {
  yield takeEvery([Types.FETCH_STACK_REQUEST], fetchStackById);
}

function* createDraftStack({ payload }: any) {
  try {
    const response: Stack = yield call(api.createDraftStack, payload.channelId);
    yield put(
      actions.fetchStackSuccess({
        stack: response,
      })
    );
  } catch (e) {
    yield put(
      actions.stackError({
        error: 'An error occured when trying to create a draft stack.',
      })
    );
  }
}

function* watchCreateDraftRequest() {
  yield takeEvery(Types.CREATE_DRAFT_STACK_REQUEST, createDraftStack);
  // pot sa pun asta in watchStackRequest chiar daca e vorba de o actiune diferite cu o functie diferita?
}

function* publishDraftStack({ payload }: any) {
  try {
    const response: Stack = yield call(api.publishDraftStack, payload.stackId);
    yield put(
      actions.fetchStackSuccess({
        stack: response,
      })
    );
  } catch (e) {
    yield put(
      actions.stackError({
        error: 'An error occured when trying to publish a draft stack.',
      })
    );
  }
}

function* watchStackPost() {
  // aici oare ar putea intra si Bind card chiar daca nu returneaza nici un stack?
  yield takeEvery(Types.PUBLISH_DRAFT_STACK_REQUEST, publishDraftStack);
}

const stackSagas = [
  fork(watchStackRequest),
  fork(watchCreateDraftRequest),
  fork(watchStackPost),
];

export default stackSagas;
