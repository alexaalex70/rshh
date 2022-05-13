export type AnswerState = 'NEW' | 'NEVER' | 'COMPLETE';

export interface Answer {
  state: AnswerState;
  props: {
    [key: string]: any;
  };
}

export type AnswerBodyState =
  | 'RESPONDER_NEW'
  | 'RESPONDER_DRAFT'
  | 'RESPONDER_COMPLETE'
  | 'EXPIRED';

export interface AnswerBody {
  state: AnswerBodyState;
  focusOnQuestion?: string;
  answers: {
    [key: string]: Answer;
  };
}
