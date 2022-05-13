import { Types } from '../../models/actionTypes/eventsTypes';
import { EventsState, EventsActions } from '../../models/types/eventsTypes';

const initialState: EventsState = {
  events: [],
  error: null,
};

export const eventsReducer = (
  state: EventsState = initialState,
  action: EventsActions
): EventsState => {
  switch (action.type) {
    case Types.FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload.events,
      };
    case Types.FETCH_EVENTS_ERROR:
      return {
        events: [],
        error: action.payload.error,
      };
    case Types.DELETE_EVENT_BY_ID_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
