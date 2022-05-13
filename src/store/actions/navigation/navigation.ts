import { Types } from '../../models/actionTypes/navigationTypes';
import {
  SuccessNavigationInformation,
  SuccessNavigationInformationPayload,
  UpdateNavigationInformation,
  UpdateNavigationInformationPayload,
} from '../../models/types/navigationTypes';

export const updateNavigationInformation = (
  payload: UpdateNavigationInformationPayload
): UpdateNavigationInformation => ({
  type: Types.UPDATE_NAVIGATION_INFORMATION,
  payload,
});

export const navigationSuccess = (
  payload: SuccessNavigationInformationPayload
): SuccessNavigationInformation => ({
  type: Types.SUCCESS_NAVIGATION_UPDATED,
  payload,
});
