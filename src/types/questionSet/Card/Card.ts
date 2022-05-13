import { LocalisedStrings } from '../LocalisedStrings';

export type CardState =
  | 'RESPONDER_NEW'
  | 'RESPONDER_DRAFT'
  | 'RESPONDER_COMPLETE'
  | 'EXPIRED';

export type CardType = 'QuestionSet' | 'Content';
export interface Title {
  internal: string;
  external: LocalisedStrings;
}
