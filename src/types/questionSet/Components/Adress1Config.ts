import { LocalisedStrings } from '../LocalisedStrings';
import { Case } from './TextField';

export interface Address1Config {
  addressline1: AddressFieldConfig;
  addressline2: AddressFieldConfig;
  city: AddressFieldConfig;
  postcode: AddressFieldConfig;
}

export interface AddressFieldConfig {
  labelText: LocalisedStrings;
  placeholder: LocalisedStrings;
  renderCase?: Case;
  required: boolean;
  validate: AddressFieldValidation;
}

export interface AddressFieldValidation {
  maxLength?: number;
  minLength?: number;
  regex?: string;
}
