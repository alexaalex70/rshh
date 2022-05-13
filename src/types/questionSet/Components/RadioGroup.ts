import { LocalisedStrings } from '../LocalisedStrings';
import { Question } from '../Question/Question';

export interface RadioGroup {
  children: [RadioButton];
  horizontal: boolean;
  size?: any;
}

export interface RadioButton {
  id: string;
  accessibilityDescription?: LocalisedStrings;
  defaultSelected: boolean;
  labelText: LocalisedStrings;
  value: string;
  question: Question;
}
