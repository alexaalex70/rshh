import { fork, takeLatest, call, put, select } from 'redux-saga/effects';
import * as api from '../../../api/events/events';
import * as actions from '../../actions/events/events';
import { Types } from '../../models/actionTypes/eventsTypes';
import { Event } from '../../models/types/eventsTypes';

export const getUserId = (state: any) => state.profile;
export const existingEvents = (state: any): Array<Event> => state.events;

const findEventId = (events: Array<Event>, questionSetId: string): string => {
  // finds an Event's id based off of a QuestionSet Id
  const event = events.find((ev) => ev.stack.cards[0].id === questionSetId);
  return event?.id || '';
};

function* getEventByUserId() {
  const { profile } = yield select(getUserId);
  try {
    const response: { events: Array<Event> } = yield call(
      api.getEventByUserId,
      profile.body.id
    );
    yield put(
      actions.fetchEventsSuccess({
        events: response.events === undefined ? [] : response.events,
      })
    );
  } catch (e) {
    yield put(
      actions.fetchEventsError({
        error: `An error occured when trying to get events for this user: ${profile.body.id}`,
      })
    );
  }
}

function* watchGetEventsByUserId() {
  yield takeLatest(
    [Types.FETCH_EVENTS_BY_USER_ID, Types.DELETE_EVENT_BY_ID_SUCCESS],
    getEventByUserId
  );
}

function* deleteEvent({ payload }: any) {
  const { events } = yield select(existingEvents);
  try {
    yield call(api.deleteEvent, findEventId(events, payload.questionSetId));
    yield put(actions.deleteEventSuccess());
  } catch (e) {
    yield put(
      actions.deleteEventError({
        error: `An error occured when trying to get this event: ${payload.questionSetId} deleted!`,
      })
    );
  }
}

function* watchDeleteEvent() {
  yield takeLatest(Types.DELETE_EVENT_BY_ID, deleteEvent);
}

const profileSaga = [fork(watchGetEventsByUserId), fork(watchDeleteEvent)];

export default profileSaga;
