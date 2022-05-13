import React, { FC, useReducer, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MeasureUnit } from 'rh-shared';
import { TextInput } from 'react-native-paper';

interface AnswerInterface {
  value: number;
  userUnit: MeasureUnit;
}

interface ComponentHandler {
  inputChangeHandler(value: any, isValid: boolean): void;
  initialValue: AnswerInterface;
  initiallyValid: boolean;
  required: boolean;
  errorText: string;
  index: number;
  disabled: boolean;
}

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const CENTIMETRES_CHANGE = 'CENTIMETRES';
const FEET_CHANGE = 'FEET_CHANGE';

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        centimeters: action.centimeters,
        feet: action.feet,
        inch: action.inch,
      };
    case CENTIMETRES_CHANGE:
      return {
        ...state,
        centimeters: action.centimeters,
        isValid: action.isValid,
        value: action.value,
      };
    case FEET_CHANGE:
      return {
        ...state,
        feet: action.feet,
        inch: action.inch,
        isValid: action.isValid,
        value: action.value,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const HeightMeasurment: FC<ComponentHandler> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue,
    isValid: props.initiallyValid,
    touched: false,
    centimeters: 0,
    feet: 0,
    inch: 0,
  });

  useEffect(() => {
    let isValid = true;
    if (props.initialValue)
      if (props.index === 0) {
        let currentValue = 0;
        currentValue = props.initialValue.value / 10;

        if (Math.trunc(currentValue) > 220 || Math.trunc(currentValue) < 100)
          isValid = false;
        dispatch({
          type: CENTIMETRES_CHANGE,
          centimeters: Math.trunc(currentValue),
          isValid: isValid,
          value: {
            value: props.initialValue.value,
            userUnit: 'CENTIMETRES',
          },
        });
      } else {
        let feet = Math.floor(props.initialValue.value / (12 * 25.4));
        let inch = (props.initialValue.value / 25.4) % 12;

        if (Math.trunc(feet) < 3 || Math.trunc(feet) > 8) isValid = false;
        if (Math.trunc(inch) > 11) isValid = false;
        dispatch({
          type: FEET_CHANGE,
          feet: Math.trunc(feet),
          inch: Math.trunc(inch),
          isValid: isValid,
          value: {
            value: props.initialValue.value,
            userUnit: 'FEET',
          },
        });
      }
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.index]);

  useEffect(() => {
    if (inputState.isValid) {
      props.inputChangeHandler({ ...inputState.value }, inputState.isValid);
    }
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputState]);

  const textChangeHandler = (text: string, unit: any) => {
    let isValid = true;
    let length;
    let feet;
    let inch;
    let cm;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (text) {
      let value = Number(text);
      let answerValue = 0;
      if (unit === 'CENTIMETRES') {
        if (Math.trunc(value) > 220 || Math.trunc(value) < 100) isValid = false;
        answerValue = value * 10;
      } else {
        if (unit === 'feet') {
          if (Math.trunc(value) < 3 || Math.trunc(value) > 8) isValid = false;
          answerValue = value * 304.8 + inputState.inch * 25.4;
        }
        if (unit === 'inch') {
          if (Math.trunc(value) > 11) isValid = false;
          answerValue = inputState.feet * 304.8 + value * 25.4;
        }
      }
      length = answerValue / 25.4;
      feet =
        unit === 'inch'
          ? inputState.feet
          : Math.floor(answerValue / (12 * 25.4));
      inch = unit === 'inch' ? value : (answerValue / 25.4) % 12;
      cm = answerValue / 10;

      dispatch({
        type: INPUT_CHANGE,
        value: {
          value: answerValue,
          userUnit: unit === 'CENTIMETRES' ? 'CENTIMETRES' : 'FEET',
        },
        isValid: isValid,
        centimeters: Math.trunc(cm),
        feet: Math.trunc(feet),
        inch: Math.trunc(inch),
      });
    } else {
      dispatch({
        type: INPUT_CHANGE,
        value: {
          value: '',
          userUnit: unit === 'CENTIMETRES' ? 'CENTIMETRES' : 'FEET',
        },
        isValid: isValid,
        centimeters: unit === 'CENTIMETRES' ? '' : inputState.centimeters,
        feet: unit === 'feet' ? '' : inputState.feet,
        inch: unit === 'inch' ? '' : inputState.inch,
      });
    }
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      {props.index === 0 ? (
        <View style={{ marginTop: 32, paddingHorizontal: 8 }}>
          <TextInput
            style={{ width: '100%' }}
            right={<TextInput.Affix text="cm" />}
            autoComplete="off"
            keyboardType={'number-pad'}
            placeholder=""
            value={String(inputState.centimeters)}
            onChangeText={(text: string) =>
              textChangeHandler(text, 'CENTIMETRES')
            }
            onBlur={lostFocusHandler}
            autoFocus={true}
            disabled={props.disabled}
          />
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 32,
            flexDirection: 'row',
            paddingHorizontal: 8,
          }}
        >
          <View style={{ flex: 1, paddingHorizontal: 2 }}>
            <TextInput
              right={<TextInput.Affix text="ft" />}
              autoComplete="off"
              keyboardType={'number-pad'}
              placeholder=""
              value={String(inputState.feet)}
              onChangeText={(text: string) => textChangeHandler(text, 'feet')}
              onBlur={lostFocusHandler}
              autoFocus={true}
              disabled={props.disabled}
            />
          </View>
          <View style={{ flex: 1, paddingHorizontal: 2 }}>
            <TextInput
              right={<TextInput.Affix text="in" />}
              autoComplete="off"
              keyboardType={'number-pad'}
              placeholder=""
              value={String(inputState.inch)}
              onChangeText={(text: string) => textChangeHandler(text, 'inch')}
              onBlur={lostFocusHandler}
              disabled={props.disabled}
            />
          </View>
        </View>
      )}
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  errorContainer: {
    marginVertical: 5,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
});

export default HeightMeasurment;
