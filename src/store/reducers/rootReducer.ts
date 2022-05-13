import { combineReducers } from 'redux';
import {
  profileReducer,
  questionSetInfoReducer,
  userInfoReducer,
  eventsReducer,
  stackReducer,
  questionSetReducer,
  navigationReducer,
} from '.';

const rootReducer = combineReducers({
  questionSet: questionSetReducer,
  stack: stackReducer,
  questionSetInfo: questionSetInfoReducer,
  profile: profileReducer,
  user: userInfoReducer,
  events: eventsReducer,
  navigation: navigationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
