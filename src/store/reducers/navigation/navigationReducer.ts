import {
  NavigationActions,
  NavigationState,
} from '../../models/types/navigationTypes';
import { Types } from '../../models/actionTypes/navigationTypes';

const initialState: NavigationState = {
  navigationId: null,
};

export const navigationReducer = (
  state: NavigationState = initialState,
  action: NavigationActions
): NavigationState => {
  switch (action.type) {
    case Types.SUCCESS_NAVIGATION_UPDATED:
      return {
        ...state,
        navigationId: action.payload.navigationId,
      };
    default:
      return {
        ...state,
      };
  }
};
