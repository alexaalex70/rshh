import { Types } from '../actionTypes/navigationTypes';

export interface NavigationState {
  navigationId: string | null;
}

export interface UpdateNavigationInformationPayload {
  navigationId: string;
}

export type UpdateNavigationInformation = {
  type: Types.UPDATE_NAVIGATION_INFORMATION;
  payload: UpdateNavigationInformationPayload;
};

export interface SuccessNavigationInformationPayload {
  navigationId: string;
}

export type SuccessNavigationInformation = {
  type: Types.SUCCESS_NAVIGATION_UPDATED;
  payload: SuccessNavigationInformationPayload;
};

export type NavigationActions =
  | UpdateNavigationInformation
  | SuccessNavigationInformation;
