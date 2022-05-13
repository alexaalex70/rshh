import { Types } from '../../models/actionTypes/stacksTypes';
import { StackState, StackActions } from '../../models/types/stacksTypes';

const initialState = {
  stack: undefined,
  error: null,
};

export const stackReducer = (
  state: StackState | undefined = initialState,
  action: StackActions
): StackState => {
  switch (action.type) {
    case Types.GET_STACK_SUCCESS:
      return {
        ...state,
        stack: JSON.parse(JSON.stringify(action.payload.stack)),
      };
    case Types.STACK_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
