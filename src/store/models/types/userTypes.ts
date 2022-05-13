import { Types } from '../actionTypes/userTypes';

export interface UserInfoState {
  id: string | null;
  subId: string | null;
  idpKey: string | null;
  phoneNumber: string | null;
  isLogged: boolean | null;
  isLoading: boolean | null;
  token: string | null;
  refreshToken: string | null;
}

export interface UpdateUserInformationPayload {
  id: string;
  subId: string;
  idpKey: string;
  phoneNumber: string;
  isLogged: boolean;
  isLoading: boolean;
  token: string;
  refreshToken: string;
}

export type UpdateUserInformation = {
  type: Types.UPDATE_USER_INFORMATION;
  payload: UpdateUserInformationPayload;
};

export interface SuccessUserInformationPayload {
  id: string;
  subId: string;
  idpKey: string;
  phoneNumber: string;
  isLogged: boolean;
  isLoading: boolean;
  token: string;
  refreshToken: string;
}

export type SuccessUserInformation = {
  type: Types.SUCCESS_USER_UPDATED;
  payload: SuccessUserInformationPayload;
};

export type UserInfoActions = UpdateUserInformation | SuccessUserInformation;
