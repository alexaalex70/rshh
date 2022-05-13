import { Types } from '../../models/actionTypes/eventsTypes';
import {
  FetchEventsError,
  FetchEventsErrorPayload,
  FetchEventsSuccess,
  FetchEventsSuccessPayload,
  GetEventByUserId,
  DeleteEvent,
  DeleteEventPayload,
  DeleteEventError,
  DeleteEventSuccess,
  DeleteEventErrorPayload,
} from '../../models/types/eventsTypes';

export const getEventByUserId = (): GetEventByUserId => ({
  type: Types.FETCH_EVENTS_BY_USER_ID,
});

export const deleteEvent = (payload: DeleteEventPayload): DeleteEvent => ({
  type: Types.DELETE_EVENT_BY_ID,
  payload,
});

export const deleteEventSuccess = (): DeleteEventSuccess => ({
  type: Types.DELETE_EVENT_BY_ID_SUCCESS,
});

export const deleteEventError = (
  payload: DeleteEventErrorPayload
): DeleteEventError => ({
  type: Types.DELETE_EVENT_BY_ID_ERROR,
  payload,
});

export const fetchEventsSuccess = (
  payload: FetchEventsSuccessPayload
): FetchEventsSuccess => ({
  type: Types.FETCH_EVENTS_SUCCESS,
  payload,
});

export const fetchEventsError = (
  payload: FetchEventsErrorPayload
): FetchEventsError => ({
  type: Types.FETCH_EVENTS_ERROR,
  payload,
});
