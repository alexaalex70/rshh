import { Types } from '../../models/actionTypes/questionSetTypes';
import {
  FetchQuestionSetById,
  FetchQuestionSetByIdPayload,
  PatchQuestionSetById,
  PatchQuestionSetByIdPayload,
  FetchQuestionSetSuccessPayload,
  QuestionSetErrorPayload,
  FetchQuestionSetSuccess,
  QuestionSetFailure,
  GrabQuestionSet,
  ResetQuestionSet,
} from '../../models/types/questionSetTypes';

export const fetchQuestionSetById = (
  payload: FetchQuestionSetByIdPayload
): FetchQuestionSetById => ({
  type: Types.GET_QUESTIONSET_REQUEST,
  payload,
});

export const patchQuestionSetById = (
  payload: PatchQuestionSetByIdPayload
): PatchQuestionSetById => ({
  type: Types.PATCH_QUESTIONSET_REQUEST,
  payload,
});

export const fetchQuestionSetSuccess = (
  payload: FetchQuestionSetSuccessPayload
): FetchQuestionSetSuccess => ({
  type: Types.GET_QUESTIONSET_SUCCESS,
  payload,
});

export const questionSetError = (
  payload: QuestionSetErrorPayload
): QuestionSetFailure => ({
  type: Types.QUESTIONSET_ERROR,
  payload,
});

export const grabQuestionSet = (payload: any): GrabQuestionSet => ({
  type: Types.GRAB_QUESTIONSET,
  payload,
});

export const resetQuestionSet = (): ResetQuestionSet => ({
  type: Types.RESET_QUESTIONSET,
});
