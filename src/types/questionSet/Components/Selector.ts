import { LocalisedStrings } from '../LocalisedStrings';
import { Question } from '../Question/Question';

export interface Selector {
  children: [SelectItem];
}

export interface SelectItem {
  id: string;
  accessibilityDescription?: LocalisedStrings;
  defaultSelected: boolean;
  labelText: LocalisedStrings;
  value: string;
  question?: Question;
}
