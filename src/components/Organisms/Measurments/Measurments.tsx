import React, { FC, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { MeasureUnit } from 'rh-shared';
import { HeightMeasurment, WeightMeasurment, WaistMeasurment } from '../..';
import Tabs from '../../Atoms/Tabs/Tabs';

interface TabularMeasurement {
  measure: string;
  units: Array<MeasureUnit>;
}

interface AnswerInterface {
  value: number;
  userUnit: MeasureUnit;
}

interface ComponentHandler {
  onInputChange(value: any, isValid: any, id: string): void;
  initialValue: AnswerInterface | undefined;
  initiallyValid: boolean;
  required: boolean;
  errorText: string;
  id: string;
  disabled: boolean;
}

type TabularMeasurementProps = ComponentHandler & TabularMeasurement;

const Measurments: FC<TabularMeasurementProps> = (props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { onInputChange, id }: any = props;

  useEffect(() => {
    let index = 0;

    // @ts-ignore: Unreachable code error
    if (Object.keys(props.initialValue).length > 0)
      // @ts-ignore: Unreachable code error
      index = props.units.indexOf(props.initialValue.userUnit);
    else index = 0;

    if (index < 0) index = 0;
    setCurrentIndex(index);
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  const handleInputChange = (value: any, isValid: boolean) => {
    onInputChange(value, isValid, id);
  };

  const renderInputForCurrentMeasurment = () => {
    switch (props.measure) {
      case 'HEIGHT': {
        return (
          <HeightMeasurment
            initialValue={
              props.initialValue && Object.keys(props.initialValue).length > 0
                ? props.initialValue
                : { value: 0, userUnit: props.units[currentIndex] }
            }
            required={props.required}
            initiallyValid={props.initiallyValid}
            inputChangeHandler={handleInputChange}
            errorText={props.errorText}
            index={currentIndex}
            disabled={props.disabled}
          />
        );
      }
      case 'WEIGHT': {
        return (
          <WeightMeasurment
            initialValue={
              props.initialValue && Object.keys(props.initialValue).length > 0
                ? props.initialValue
                : { value: 0, userUnit: props.units[currentIndex] }
            }
            required={props.required}
            initiallyValid={props.initiallyValid}
            inputChangeHandler={handleInputChange}
            errorText={props.errorText}
            index={currentIndex}
            disabled={props.disabled}
          />
        );
      }
      case 'WAIST': {
        return (
          <WaistMeasurment
            initialValue={
              props.initialValue && Object.keys(props.initialValue).length > 0
                ? props.initialValue
                : { value: 0, userUnit: props.units[currentIndex] }
            }
            required={props.required}
            initiallyValid={props.initiallyValid}
            inputChangeHandler={handleInputChange}
            errorText={props.errorText}
            index={currentIndex}
            disabled={props.disabled}
          />
        );
      }
      default: {
        <Text>There is no this type of measurment rendered on FE.</Text>;
      }
    }
  };

  return (
    <View style={{ padding: 0 }}>
      <Tabs
        tabs={props.units}
        index={currentIndex}
        onChange={(i) => setCurrentIndex(i)}
      />
      {renderInputForCurrentMeasurment()}
    </View>
  );
};

export default Measurments;
