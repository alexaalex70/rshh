import { Types } from '../../models/actionTypes/questionSetTypes';
import {
  QuestionSetActions,
  QuestionSetState,
} from '../../models/types/questionSetTypes';

const initialState: QuestionSetState = {
  questionSet: undefined,
  error: null,
};

export const questionSetReducer = (
  state: QuestionSetState = initialState,
  action: QuestionSetActions
): QuestionSetState => {
  switch (action.type) {
    case Types.GET_QUESTIONSET_SUCCESS:
      return {
        ...state,
        questionSet: JSON.parse(JSON.stringify(action.payload.questionSet)),
      };
    case Types.QUESTIONSET_ERROR:
      return {
        questionSet: undefined,
        error: action.payload.error,
      };
    case Types.GRAB_QUESTIONSET:
      return {
        ...state,
        questionSet: action.payload.questionSet,
      };
    case Types.RESET_QUESTIONSET:
      return {
        ...state,
        questionSet: undefined,
      };
    default:
      return {
        ...state,
      };
  }
};
