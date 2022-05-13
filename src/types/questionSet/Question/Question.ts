import { Address1Config, MeasureFieldConfig, Selector } from '../..';
import { CheckboxGroup } from '../Components/CheckboxGroup';
import { RadioGroup } from '../Components/RadioGroup';
import { TextField } from '../Components/TextField';
import { LocalisedStrings } from '../LocalisedStrings';
import { Conditional } from '../Sex';
import { QuestionType } from './QuestionType';
import { DateTimeConfig } from '../Components/DateTimePicker';

export type Config = CheckboxGroup | RadioGroup;
export type SecondConfig =
  | TextField
  | MeasureFieldConfig
  | Address1Config
  | Selector
  | DateTimeConfig;

export interface Question {
  id: string;
  type: QuestionType;
  accessibilityDescription?: LocalisedStrings;
  conditional?: Conditional;
  disabled: boolean;
  helpText?: LocalisedStrings;
  hint?: Hint;
  questionText: LocalisedStrings;
  required: boolean;
  custom: boolean;
  config:
    | {
        children: Config;
      }
    | SecondConfig;
}

export interface Hint {
  title: LocalisedStrings;
  body: LocalisedStrings;
}
