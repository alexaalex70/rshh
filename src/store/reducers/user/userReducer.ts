import { Types } from '../../models/actionTypes/userTypes';
import { UserInfoActions, UserInfoState } from '../../models/types/userTypes';

const initialState: UserInfoState = {
  id: null,
  subId: null,
  idpKey: null,
  phoneNumber: null,
  isLogged: null,
  isLoading: null,
  token: null,
  refreshToken: null,
};

export const userInfoReducer = (
  state: UserInfoState = initialState,
  action: UserInfoActions
): UserInfoState => {
  switch (action.type) {
    case Types.SUCCESS_USER_UPDATED:
      return {
        ...state,
        id: action.payload.id,
        subId: action.payload.subId,
        phoneNumber: action.payload.phoneNumber,
        idpKey: action.payload.idpKey,
        isLogged: action.payload.isLogged,
        isLoading: action.payload.isLoading,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    default:
      return {
        ...state,
      };
  }
};
