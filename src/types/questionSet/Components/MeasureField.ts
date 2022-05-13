export interface MeasureFieldConfig {
  defaultValue?: number;
  measure: Measure;
  units: Array<MeasureUnit>;
}

export type MeasureUnit =
  | 'KILOS'
  | 'CENTIMETRES'
  | 'POUNDS'
  | 'STONES'
  | 'FEET'
  | 'INCHES';

export type Measure = 'WEIGHT' | 'HEIGHT' | 'WAIST' | 'NECK';
