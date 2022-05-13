import { Types } from '../../models/actionTypes/profileTypes';
import {
  FetchProfileById,
  FetchProfileSuccess,
  ProfileFailure,
  FetchProfileByIdPayload,
  FetchProfileSuccessPayload,
  ProfileErrorPayload,
  FetchProfileByIDPId,
} from '../../models/types/profileTypes';

export const fetchProfileById = (
  payload: FetchProfileByIdPayload
): FetchProfileById => ({
  type: Types.FETCH_PROFILE_FOR_ID,
  payload,
});

export const fetchProfileByIDPId = (
  payload: FetchProfileByIdPayload
): FetchProfileByIDPId => ({
  type: Types.FETCH_PROFILE_FOR_IDP_ID,
  payload,
});

export const fetchProfileSuccess = (
  payload: FetchProfileSuccessPayload
): FetchProfileSuccess => ({
  type: Types.PROFILE_SUCCESS,
  payload,
});

export const profileError = (payload: ProfileErrorPayload): ProfileFailure => ({
  type: Types.PROFILE_ERROR,
  payload,
});
