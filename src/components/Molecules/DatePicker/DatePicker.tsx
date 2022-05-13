// import * as React from 'react';
import React, { FC, useCallback, useEffect, useReducer } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

enum DatepickerMode {
  DATE_SINGLE_INPUT = 'single',
  DATE_SINGLE_PICK = 'single',
  DATE_MULTI_PICK = 'multiple',
  DATE_RANGE_PICK = 'range',
  TIME_SINGLE_PICK = 'time',
}

interface InputInterface {
  value: any;
  savedValue: any;
  isValid: boolean;
  errorMessage: string;
  touched: boolean;
}

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state: InputInterface, action: any) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        savedValue: action.savedValue,
        isValid: action.isValid,
        errorMessage: action.errorMessage,
        touched: false,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: action.touched,
      };
    default:
      return state;
  }
};

const DatePicker: FC<any> = (props) => {
  const locale = 'en-GB';
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDateMode = () => {
    if (props.mode && props.mode in DatepickerMode)
      //@ts-ignore
      return DatepickerMode[props.mode];

    return 'single';
  };

  const onCheckInitValue = (value: any) => {
    let data;
    let mode = handleDateMode();
    if (Array.isArray(value) && value.length > 0 && mode === 'multiple')
      data = value.map((date: string) => new Date(date));
    else if (Array.isArray(value) && value.length > 0 && mode === 'range')
      data = {
        startDate: new Date(value[0]),
        endDate: new Date(value[1]),
      };
    else if (mode === 'time')
      data = {
        hours: value.substring(0, value.indexOf(':')),
        minutes: value.substring(value.indexOf(':') + 1, value.length),
      };
    else data = new Date(value);

    return data;
  };

  const [inputState, dispatch] = useReducer(inputReducer, {
    // @ts-ignore: Unreachable code error
    value:
      props.initialValue && props.initialValue.value
        ? onCheckInitValue(props.initialValue.value)
        : '',
    savedValue:
      props.initialValue && props.initialValue.value
        ? props.initialValue.value
        : '',
    isValid: props.initiallyValid,
    errorMessage: '',
    touched: false,
  });

  const { inputChangeHandler, id }: any = props;

  useEffect(() => {
    if (inputState.touched || inputState.isValid) {
      inputChangeHandler(
        { value: inputState.savedValue },
        inputState.isValid,
        id
      );
    }
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputState, id]);

  useEffect(() => {
    if (inputState.savedValue) dispatch({ type: INPUT_BLUR, touched: false });
  }, [inputState.savedValue]);

  const onChange = useCallback(
    (params) => {
      if (params.date) {
        let savedValue;
        let valid = true;
        let errMessage = '';

        if (params.date) {
          savedValue = new Date(params.date).toISOString().substring(0, 10);

          let choosedDate = new Date(params.date);

          if (props.validate && props.validate.maxDate) {
            let maxDate = new Date(props.validate.maxDate);

            if (maxDate.getFullYear() < choosedDate.getFullYear()) {
              valid = false;
              errMessage = props.validate.maxDateExceededError;
            }
          }

          if (props.validate && props.validate.minDate) {
            let minDate = new Date(props.validate.minDate);

            if (minDate.getFullYear() > choosedDate.getFullYear()) {
              valid = false;
              errMessage = props.validate.minDateExceededError;
            }
          }
        } else {
          savedValue = params.dates.map((date: string) =>
            new Date(date).toISOString().substring(0, 10)
          );
        }

        dispatch({
          type: INPUT_CHANGE,
          value: params.date ? params.date : params.dates,
          savedValue: savedValue,
          isValid: valid,
          errorMessage: errMessage,
        });
      }
    },
    [props.validate]
  );

  const onChangeRange = useCallback(({ startDate, endDate }) => {
    if (startDate && endDate) {
      let savedValue = [
        new Date(startDate).toISOString().substring(0, 10),
        new Date(endDate).toISOString().substring(0, 10),
      ];

      dispatch({
        type: INPUT_CHANGE,
        value: { startDate, endDate },
        savedValue: savedValue,
        isValid: true,
      });
    }
  }, []);

  const onChangeTime = useCallback(({ hours, minutes }) => {
    if (hours && minutes) {
      let savedValue = hours + ':' + minutes;

      dispatch({
        type: INPUT_CHANGE,
        value: { hours, minutes },
        savedValue: savedValue,
        isValid: true,
      });
    }
  }, []);

  const onDismiss = useCallback(() => {
    dispatch({ type: INPUT_BLUR, touched: false });
  }, []);

  return (
    <View>
      {handleDateMode() === 'time' ? (
        <View>
          <TextInput
            autoComplete="off"
            placeholder={'Select time'}
            disabled={true}
            value={
              inputState.value
                ? inputState.value.hours + ':' + inputState.value.minutes
                : ''
            }
            right={
              <TextInput.Icon
                name="clock-outline"
                color={'gray'}
                onPress={() => dispatch({ type: INPUT_BLUR, touched: true })}
              />
            }
          />
          <TimePickerModal
            locale={locale}
            visible={inputState.touched}
            onDismiss={onDismiss}
            onConfirm={onChangeTime}
            //hours={time.hours} // optional, default: current hours
            //minutes={time.minutes} // optional, default: current minutes
          />
        </View>
      ) : (
        <View>
          <TextInput
            autoComplete="off"
            placeholder={inputState.value ? 'Dates selected' : 'Select date'}
            value={
              inputState.value &&
              handleDateMode() !== 'multiple' &&
              handleDateMode() !== 'range'
                ? dateFormatter.format(inputState.value)
                : ''
            }
            disabled={true}
            right={
              <TextInput.Icon
                name="calendar-edit"
                color={'gray'}
                onPress={() => dispatch({ type: INPUT_BLUR, touched: true })}
              />
            }
          />
          {!inputState.isValid && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{inputState.errorMessage}</Text>
            </View>
          )}
          <DatePickerModal
            locale={locale}
            //@ts-ignore
            mode={handleDateMode()}
            //@ts-ignore
            startDate={
              inputState.value.startDate
                ? inputState.value.startDate
                : undefined
            }
            //@ts-ignore
            endDate={
              inputState.value.endDate ? inputState.value.endDate : undefined
            }
            visible={inputState.touched}
            onDismiss={onDismiss}
            date={
              handleDateMode() === 'single' && inputState.value
                ? inputState.value
                : undefined
            }
            dates={
              handleDateMode() === 'multiple' && inputState.value
                ? inputState.value
                : undefined
            }
            onConfirm={handleDateMode() === 'range' ? onChangeRange : onChange}
            animationType="slide"
          />
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
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
});

export default DatePicker;
