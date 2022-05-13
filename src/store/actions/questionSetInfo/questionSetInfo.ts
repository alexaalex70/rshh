import { Types } from '../../models/actionTypes/questionSetInfoTypes';
import {
  UpdateQuestionSetInformation,
  UpdateQuestionSetInformationPayload,
  SuccessQuestionSetInformationPayload,
  SuccessQuestionSetInformation,
  UpdateHintPayload,
  UpdateHint,
  SuccessUpdateHint,
  SuccessUpdateHintPayload,
} from '../../models/types/questionSetInfoTypes';

export const updateQuestionSetInformation = (
  payload: UpdateQuestionSetInformationPayload
): UpdateQuestionSetInformation => ({
  type: Types.UPDATE_QUESTIONSET_INFORMATION,
  payload,
});

export const updateHint = (payload: UpdateHintPayload): UpdateHint => ({
  type: Types.UPDATE_HINT_STATUS,
  payload,
});

export const successQuestionSetInformation = (
  payload: SuccessQuestionSetInformationPayload
): SuccessQuestionSetInformation => ({
  type: Types.SUCCESS_SET_QUESTIONSET_INFORMATION,
  payload,
});

export const successUpdateHint = (
  payload: SuccessUpdateHintPayload
): SuccessUpdateHint => ({
  type: Types.SUCCESS_HINT_UPDATED,
  payload,
});
