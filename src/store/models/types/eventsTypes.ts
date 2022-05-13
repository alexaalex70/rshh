import { Stack } from '../../../types/stacks/Stack/Stack';
import { Types } from '../actionTypes/eventsTypes';

export type EventTypes =
  | 'CLINICIAN_MEMBER_CHANNEL_MESSAGE_TO_CLINICIAN'
  | 'CLINICIAN_MEMBER_CHANNEL_MESSAGE_TO_MEMBER'
  | 'MENTOR_MEMBER_CHANNEL_MESSAGE_TO_MENTOR'
  | 'CARD_ACTION_TO_MEMBER';

export interface Event {
  id: string;
  eventType: EventTypes;
  createdBy: {
    id: string;
    profileType: string;
    roles: Array<string>;
    displayName: string;
    avatarInitials: string;
    groupId: string | null;
    programme: string;
  };
  updatedAt: string;
  updatedBy: {
    id: string;
    profileType: string;
    roles: Array<string>;
    displayName: string;
    avatarInitials: string;
    groupId: string | null;
    programme: string;
  };
  state: string;
  stack: Stack;
  claimant: string | null;
  member: {
    id: string;
    profileType: string;
    roles: Array<string>;
    displayName: string;
    avatarInitials: string;
    groupId: string | null;
    programme: string;
  };
  primaryClinician: {
    id: string;
    profileType: string;
    roles: Array<string>;
    displayName: string;
    avatarInitials: string | null;
    groupId: string;
    programme: string | null;
  };
  createdAt: string;
}

export interface EventsState {
  events: Array<Event>;
  error: string | null;
}

export type GetEventByUserId = {
  type: Types.FETCH_EVENTS_BY_USER_ID;
};

export interface DeleteEventPayload {
  questionSetId: string;
}

export type DeleteEvent = {
  type: Types.DELETE_EVENT_BY_ID;
  payload: DeleteEventPayload;
};

export type DeleteEventSuccess = {
  type: Types.DELETE_EVENT_BY_ID_SUCCESS;
};

export interface DeleteEventErrorPayload {
  error: string;
}

export type DeleteEventError = {
  type: Types.DELETE_EVENT_BY_ID_ERROR;
  payload: DeleteEventErrorPayload;
};

export interface FetchEventsSuccessPayload {
  events: Array<Event>;
}

export type FetchEventsSuccess = {
  type: Types.FETCH_EVENTS_SUCCESS;
  payload: FetchEventsSuccessPayload;
};

export interface FetchEventsErrorPayload {
  error: string;
}

export type FetchEventsError = {
  type: Types.FETCH_EVENTS_ERROR;
  payload: FetchEventsErrorPayload;
};

export type EventsActions =
  | GetEventByUserId
  | DeleteEvent
  | FetchEventsSuccess
  | FetchEventsError
  | DeleteEventError;
