import { Types } from '../actionTypes/profileTypes';

export interface ProfileState {
  profile: any;
  impersonate: boolean;
  error: string | null;
}

export interface FetchProfileByIdPayload {
  userId: string;
  impersonate: boolean;
}

export type FetchProfileById = {
  type: Types.FETCH_PROFILE_FOR_ID;
  payload: FetchProfileByIdPayload;
};

export type FetchProfileByIDPId = {
  type: Types.FETCH_PROFILE_FOR_IDP_ID;
  payload: FetchProfileByIdPayload;
};

export interface FetchProfileSuccessPayload {
  profile: any;
  impersonate: boolean;
}

export type FetchProfileSuccess = {
  type: typeof Types.PROFILE_SUCCESS;
  payload: FetchProfileSuccessPayload;
};

export interface ProfileErrorPayload {
  error: string;
}

export type ProfileFailure = {
  type: typeof Types.PROFILE_ERROR;
  payload: ProfileErrorPayload;
};

export type ProfileInfoActions =
  | FetchProfileById
  | FetchProfileByIDPId
  | FetchProfileSuccess
  | ProfileFailure;
