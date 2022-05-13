import { Hint } from '../../../types';
import { AnswerBody } from '../../../types/questionSet/Answer/Answer';
import { QuestionSet } from '../../../types/questionSet/Question/QuestionSet';
import { Types } from '../actionTypes/questionSetTypes';

export interface QuestionSetState {
  questionSet: QuestionSet | undefined;
  error: string | null;
}

export interface FetchQuestionSetByIdPayload {
  questionId: string;
}

export interface UpdateQuestionSetInformationPayload {
  hint: Hint;
  questionIndex: number;
}

export interface PatchQuestionSetByIdPayload {
  questionSetId: string;
  body: AnswerBody;
}

export type FetchQuestionSetById = {
  type: Types.GET_QUESTIONSET_REQUEST;
  payload: FetchQuestionSetByIdPayload;
};

export type PatchQuestionSetById = {
  type: Types.PATCH_QUESTIONSET_REQUEST;
  payload: PatchQuestionSetByIdPayload;
};

export interface FetchQuestionSetSuccessPayload {
  questionSet: QuestionSet | undefined;
}

export type FetchQuestionSetSuccess = {
  type: typeof Types.GET_QUESTIONSET_SUCCESS;
  payload: FetchQuestionSetSuccessPayload;
};

export interface QuestionSetErrorPayload {
  error: string;
}

export type QuestionSetFailure = {
  type: typeof Types.QUESTIONSET_ERROR;
  payload: QuestionSetErrorPayload;
};

export type GrabQuestionSet = {
  type: Types.GRAB_QUESTIONSET;
  payload: FetchQuestionSetSuccessPayload;
};

export type ResetQuestionSet = {
  type: Types.RESET_QUESTIONSET;
};

export type QuestionSetActions =
  | FetchQuestionSetById
  | PatchQuestionSetById
  | FetchQuestionSetSuccess
  | QuestionSetFailure
  | GrabQuestionSet
  | ResetQuestionSet;
