import { Hint } from '../../../types';
import { Types } from '../actionTypes/questionSetInfoTypes';

export interface QuestionSetInfoState {
  hint: Hint | undefined;
  questionIndex: number | null;
  hintStatus: boolean;
}

export interface UpdateQuestionSetInformationPayload {
  hint: Hint;
  questionIndex: number;
}

export interface UpdateHintPayload {
  hintStatus: boolean;
}

export type UpdateQuestionSetInformation = {
  type: Types.UPDATE_QUESTIONSET_INFORMATION;
  payload: UpdateQuestionSetInformationPayload;
};

export type UpdateHint = {
  type: Types.UPDATE_HINT_STATUS;
  payload: UpdateHintPayload;
};

export interface SuccessQuestionSetInformationPayload {
  hint: Hint;
  questionIndex: number;
}

export type SuccessQuestionSetInformation = {
  type: Types.SUCCESS_SET_QUESTIONSET_INFORMATION;
  payload: UpdateQuestionSetInformationPayload;
};

export interface SuccessUpdateHintPayload {
  hintStatus: boolean;
}

export type SuccessUpdateHint = {
  type: Types.SUCCESS_HINT_UPDATED;
  payload: SuccessUpdateHintPayload;
};

export type QuestionSetInfoActions =
  | UpdateQuestionSetInformation
  | UpdateHint
  | SuccessQuestionSetInformation
  | SuccessUpdateHint;
