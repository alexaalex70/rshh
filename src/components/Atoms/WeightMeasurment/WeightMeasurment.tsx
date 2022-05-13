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
const KG_CHANGE = 'KG_CHANGE';
const STONES_CHANGE = 'STONES_CHANGE';
const POUNDS_CHANGE = 'POUNDS_CHANGE';

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        kg: action.kg,
        st: action.st,
        lbs: action.lbs,
        pounds: action.pounds,
      };
    case KG_CHANGE:
      return {
        ...state,
        kg: action.kg,
        isValid: action.isValid,
        value: action.value,
      };
    case STONES_CHANGE:
      return {
        ...state,
        st: action.st,
        lbs: action.lbs,
        isValid: action.isValid,
        value: action.value,
      };
    case POUNDS_CHANGE:
      return {
        ...state,
        pounds: action.pounds,
        value: action.value,
        isValid: action.isValid,
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

const WeightMeasurment: FC<ComponentHandler> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue,
    isValid: props.initiallyValid,
    touched: false,
    kg: 0,
    lbs: 0,
    st: 0,
    pounds: 0,
  });

  useEffect(() => {
    let isValid = true;
    if (props.initialValue)
      if (props.index === 0) {
        let currentValue = 0;
        currentValue = props.initialValue.value / 1000;

        if (currentValue > 200 || currentValue < 40) isValid = false;
        dispatch({
          type: KG_CHANGE,
          kg: currentValue % 1 ? currentValue.toFixed(1) : currentValue,
          isValid: isValid,
          value: {
            value: props.initialValue.value,
            userUnit: 'KILOS',
          },
        });
      } else if (props.index === 1) {
        let pounds = (props.initialValue.value / 453.59237) % 14;
        let stones = Math.floor(props.initialValue.value / (453.59237 * 14));

        if (Math.trunc(stones) < 3 || Math.trunc(stones) > 30) isValid = false;
        if (Math.trunc(pounds) === 0 || Math.trunc(pounds) > 13)
          isValid = false;
        dispatch({
          type: STONES_CHANGE,
          st: Math.trunc(stones),
          lbs: Math.trunc(pounds),
          isValid: isValid,
          value: {
            value: props.initialValue.value,
            userUnit: 'STONES',
          },
        });
      } else if (props.index === 2) {
        let pounds = props.initialValue.value / 453.59237;

        if (Math.trunc(pounds) < 50 || Math.trunc(pounds) > 420)
          isValid = false;
        dispatch({
          type: POUNDS_CHANGE,
          pounds: Math.trunc(pounds),
          isValid: isValid,
          value: {
            value: props.initialValue.value,
            userUnit: 'POUNDS',
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
      let decimal = '';

      if (unit === 'KILOS') {
        if (value > 200 || value < 40) isValid = false;
        answerValue = value * 1000;
        if (text.match(/^[0-9]+$/) === null) decimal = text;
      } else if (unit === 'POUNDS') {
        if (Math.trunc(value) < 50 || Math.trunc(value) > 420) isValid = false;
        answerValue = Math.trunc(value * 453.59237);
      } else {
        if (unit === 'STONES_ST') {
          if (Math.trunc(value) < 3 || Math.trunc(value) > 30) isValid = false;
          answerValue = (value * 14 + inputState.lbs) * 453.59237;
        }
        if (unit === 'STONES_LBS') {
          if (Math.trunc(value) > 13) isValid = false;
          answerValue = (inputState.st * 14 + value) * 453.59237;
        }
      }
      let kg = answerValue / 1000;
      let pounds =
        unit === 'POUNDS' ? value : Math.trunc(answerValue / 453.59237);
      let stones =
        unit === 'STONES_LBS'
          ? inputState.st
          : Math.trunc(Math.floor(answerValue / (453.59237 * 14)));
      let lbs =
        unit === 'STONES_LBS'
          ? value
          : Math.trunc((answerValue / 453.59237) % 14);

      if (decimal && decimal[decimal.indexOf('.') + 2]) {
        decimal = decimal.slice(0, -1);
      }

      dispatch({
        type: INPUT_CHANGE,
        value: {
          value: answerValue,
          userUnit: unit === 'POUNDS' || unit === 'KILOS' ? unit : 'STONES',
        },
        isValid: isValid,
        kg: decimal ? decimal : kg % 1 ? kg.toFixed(1) : kg,
        lbs: lbs,
        st: stones,
        pounds: pounds,
      });
    } else {
      dispatch({
        type: INPUT_CHANGE,
        value: {
          value: '',
          userUnit: unit === 'CENTIMETRES' ? 'CENTIMETRES' : 'FEET',
        },
        isValid: isValid,
        kg: unit === 'KILOS' ? '' : inputState.kg,
        lbs: unit === 'STONES_LBS' ? '' : inputState.lbs,
        st: unit === 'STONES_ST' ? '' : inputState.st,
        pounds: unit === 'POUNDS' ? '' : inputState.pounds,
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
            right={<TextInput.Affix text="kg" />}
            autoComplete="off"
            keyboardType={'number-pad'}
            placeholder=""
            value={String(inputState.kg)}
            onChangeText={(text: string) => textChangeHandler(text, 'KILOS')}
            onBlur={lostFocusHandler}
            autoFocus={true}
            disabled={props.disabled}
          />
        </View>
      ) : props.index === 1 ? (
        <View style={styles.stoneStyle}>
          <View style={{ flex: 1, paddingHorizontal: 2 }}>
            <TextInput
              right={<TextInput.Affix text="st" />}
              autoComplete="off"
              keyboardType={'number-pad'}
              placeholder=""
              value={String(inputState.st)}
              onChangeText={(text: string) =>
                textChangeHandler(text, 'STONES_ST')
              }
              onBlur={lostFocusHandler}
              autoFocus={true}
              disabled={props.disabled}
            />
          </View>
          <View style={{ flex: 1, paddingHorizontal: 2 }}>
            <TextInput
              right={<TextInput.Affix text="lbs" />}
              autoComplete="off"
              keyboardType={'number-pad'}
              placeholder=""
              value={String(inputState.lbs)}
              onChangeText={(text: string) =>
                textChangeHandler(text, 'STONES_LBS')
              }
              onBlur={lostFocusHandler}
              disabled={props.disabled}
            />
          </View>
        </View>
      ) : (
        <View style={{ marginTop: 32, paddingHorizontal: 8 }}>
          <TextInput
            style={{ width: '100%' }}
            right={<TextInput.Affix text="lbs" />}
            autoComplete="off"
            keyboardType={'number-pad'}
            placeholder=""
            value={String(inputState.pounds)}
            onChangeText={(text: string) => textChangeHandler(text, 'POUNDS')}
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

export default WeightMeasurment;
