import { LocalisedStrings } from '../LocalisedStrings';

export type DateTimeMode =
  | 'DATE_SINGLE_INPUT'
  | 'DATE_SINGLE_PICK'
  | 'DATE_MULTI_PICK'
  | 'DATE_RANGE_PICK'
  | 'TIME_SINGLE_PICK';

export interface DateTimeValidation {
  autoMax?: string;
  autoMin?: string;
  maxDate?: string;
  maxDateExceededError: LocalisedStrings;
  minDate: string;
  minDateExceededError: LocalisedStrings;
}

export interface DateTimeConfig {
  defaultValue?: string;
  dateTimeMode: DateTimeMode;
  labelText: LocalisedStrings;
  validate: DateTimeValidation;
}
