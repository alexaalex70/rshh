import { Types } from '../../models/actionTypes/questionSetInfoTypes';
import {
  QuestionSetInfoActions,
  QuestionSetInfoState,
} from '../../models/types/questionSetInfoTypes';

const initialState: QuestionSetInfoState = {
  hint: undefined,
  questionIndex: null,
  hintStatus: false,
};

export const questionSetInfoReducer = (
  state: QuestionSetInfoState = initialState,
  action: QuestionSetInfoActions
): QuestionSetInfoState => {
  switch (action.type) {
    case Types.SUCCESS_SET_QUESTIONSET_INFORMATION:
      return {
        ...state,
        hint: action.payload.hint,
        questionIndex: action.payload.questionIndex,
      };
    case Types.SUCCESS_HINT_UPDATED:
      return {
        ...state,
        hintStatus: action.payload.hintStatus,
      };
    default:
      return {
        ...state,
      };
  }
};
