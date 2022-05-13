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
const INCHES_CHANGE = 'INCHES_CHANGE';

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        cm: action.cm,
        in: action.in,
      };
    case CENTIMETRES_CHANGE:
      return {
        ...state,
        cm: action.cm,
        isValid: action.isValid,
        value: action.value,
      };
    case INCHES_CHANGE:
      return {
        ...state,
        in: action.in,
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

const WaistMeasurment: FC<ComponentHandler> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue,
    isValid: props.initiallyValid,
    touched: false,
    cm: 0,
    in: 0,
  });

  useEffect(() => {
    let isValid = true;
    if (props.initialValue)
      if (props.index === 0) {
        let currentValue = 0;
        currentValue = props.initialValue.value / 10;

        if (Math.trunc(currentValue) > 300 || Math.trunc(currentValue) < 15)
          isValid = false;
        dispatch({
          type: CENTIMETRES_CHANGE,
          cm: Math.trunc(currentValue),
          isValid: isValid,
          value: {
            value: props.initialValue.value,
            userUnit: 'CENTIMETRES',
          },
        });
      } else {
        let inches = Math.trunc(props.initialValue.value / 25.4);

        if (inches < 6 || inches > 118) isValid = false;
        dispatch({
          type: INCHES_CHANGE,
          in: inches,
          isValid: isValid,
          value: {
            value: props.initialValue.value,
            userUnit: 'INCHES',
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

    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (text) {
      let value = Number(text);
      let answerValue = 0;
      if (unit === 'CENTIMETRES') {
        if (value > 300 || value < 15) isValid = false;
        answerValue = value * 10;
      } else {
        if (value < 6 || value > 118) isValid = false;
        answerValue = value * 25.4;
      }

      let inch = unit === 'INCHES' ? value : answerValue / 25.4;
      let cm = answerValue / 10;

      dispatch({
        type: INPUT_CHANGE,
        value: { value: answerValue, userUnit: unit },
        isValid: isValid,
        cm: Math.trunc(cm),
        in: Math.trunc(inch),
      });
    } else {
      dispatch({
        type: INPUT_CHANGE,
        value: { value: '', userUnit: unit },
        isValid: isValid,
        cm: '',
        in: '',
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
            value={String(inputState.cm)}
            onChangeText={(text: string) =>
              textChangeHandler(text, 'CENTIMETRES')
            }
            onBlur={lostFocusHandler}
            autoFocus={true}
            disabled={props.disabled}
          />
        </View>
      ) : (
        <View style={{ marginTop: 32, paddingHorizontal: 8 }}>
          <TextInput
            style={{ width: '100%' }}
            right={<TextInput.Affix text="in" />}
            autoComplete="off"
            keyboardType={'number-pad'}
            placeholder=""
            value={String(inputState.in)}
            onChangeText={(text: string) => textChangeHandler(text, 'INCHES')}
            onBlur={lostFocusHandler}
            autoFocus={true}
            disabled={props.disabled}
          />
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
  stoneStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
});

export default WaistMeasurment;
