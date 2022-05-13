import { Types } from '../../models/actionTypes/userTypes';
import {
  SuccessUserInformation,
  SuccessUserInformationPayload,
  UpdateUserInformation,
  UpdateUserInformationPayload,
} from '../../models/types/userTypes';

export const updateUserInformation = (
  payload: UpdateUserInformationPayload
): UpdateUserInformation => ({
  type: Types.UPDATE_USER_INFORMATION,
  payload,
});

export const userUpdateSuccess = (
  payload: SuccessUserInformationPayload
): SuccessUserInformation => ({
  type: Types.SUCCESS_USER_UPDATED,
  payload,
});
