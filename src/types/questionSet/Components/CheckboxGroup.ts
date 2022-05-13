import { LocalisedStrings } from '../LocalisedStrings';
import { Question } from '../Question/Question';

export interface CheckboxGroup {
  children: [Checkbox];
  horizontal: boolean;
  size?: any;
}

export interface Checkbox {
  id: string;
  accessibilityDescription?: LocalisedStrings;
  defaultSelected: boolean;
  labelText: LocalisedStrings;
  question: Question;
}
