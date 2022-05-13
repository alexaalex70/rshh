import { Types } from '../../models/actionTypes/profileTypes';
import {
  ProfileState,
  ProfileInfoActions,
} from '../../models/types/profileTypes';

const initialState: ProfileState = {
  profile: null,
  impersonate: false,
  error: null,
};

export const profileReducer = (
  state: ProfileState = initialState,
  action: ProfileInfoActions
): ProfileState => {
  switch (action.type) {
    case Types.PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload.profile,
        impersonate: action.payload.impersonate,
      };
    case Types.PROFILE_ERROR:
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
