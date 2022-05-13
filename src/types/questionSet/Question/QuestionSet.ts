import { Answer } from '../Answer/Answer';
import { CardState, Title, CardType } from '../Card/Card';
import { Section } from './Section';
export interface QuestionSet {
  id: string;
  cardType: CardType;
  updatedAt: string;
  updatedBy: string;
  state: CardState;
  title: Title;
  clinicianVisibilityOnly: boolean;
  stackIds: string[];
  followOnProcess?: string;
  sections: Section[];
  focusOnQuestion?: string;
  answers: {
    [key: string]: Answer;
  };
  submittedAt: string;
}
