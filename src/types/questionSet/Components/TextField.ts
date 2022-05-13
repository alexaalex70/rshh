import { LocalisedStrings } from '../LocalisedStrings';

export interface TextFieldValidation {
  maxLength?: number;
  maxValue?: number;
  minLength?: number;
  minValue?: number;
  regex?: string;
}

export type SubType = 'INTEGER' | 'TEXT' | 'DECIMAL' | 'EMAIL' | 'TEL';

export type Case = 'LOWER' | 'UPPER';

export interface TextField {
  id: string;
  defaultValue?: any;
  labelText?: LocalisedStrings;
  maxRows?: number;
  minRows?: number;
  multiline: boolean;
  placeholder?: LocalisedStrings;
  renderCase?: Case;
  rows?: number;
  size?: any;
  subType: SubType;
  validate: TextFieldValidation;
}
