import React, { FC, useReducer, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { SelectItem } from 'rh-shared';

interface SelectInterface {
  id: string;
  inputChangeHandler(value: any, isValid: any, id: string): void;
  initialValue: string;
  initiallyValid: boolean;
  required: boolean;
  errorText: string;
  options: SelectItem[];
  disabled: boolean;
}

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const FOCUS_CHANGE = 'FOCUS_CHANGE';
const SET_LABEL = 'SET_LABEL';

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        focus: action.focus,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
        focus: false,
      };
    case FOCUS_CHANGE:
      return {
        ...state,
        focus: true,
      };
    case SET_LABEL:
      return {
        ...state,
        label: action.label,
        filteredArray: action.filteredArray,
      };
    default:
      return state;
  }
};

const Select: FC<SelectInterface> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value:
      // @ts-ignore: Unreachable code error
      props.initialValue && props.initialValue.value
        ? // @ts-ignore: Unreachable code error
          props.initialValue.value
        : '',
    label: '',
    isValid: props.initiallyValid,
    filteredArray: [],
    touched: false,
    focus: false,
  });

  const { onInputChange, id }: any = props;

  useEffect(() => {
    if (inputState.touched || inputState.isValid) {
      onInputChange({ value: inputState.value }, inputState.isValid, id);
    }
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputState, id]);

  useEffect(() => {
    const found = props.options.find(
      (item: SelectItem) => item.value === inputState.value
    );
    let filteredData;
    if (inputState.label || !found) {
      const text = found ? inputState.label : inputState.value;
      filteredData = props.options.filter((item: SelectItem) => {
        if (item.labelText.en.toLocaleLowerCase().includes(text.toLowerCase()))
          return item.labelText.en;
      });
    }

    dispatch({
      type: SET_LABEL,
      label: found ? found.labelText.en : inputState.value,
      filteredArray: filteredData ? filteredData : props.options,
    });
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputState.value]);

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  const textChangeHandler = (text: string, focus: boolean) => {
    Keyboard.dismiss();
    let isValid = true;
    if (props.required && text.trim().length === 0) isValid = false;
    const found = props.options.find(
      (item: SelectItem) => item.labelText.en === text
    );
    if (!found) isValid = false;

    dispatch({
      type: INPUT_CHANGE,
      value: found ? found.value : text,
      isValid: isValid && found ? true : false,
      focus: focus,
    });
  };

  const handleFocus = () => {
    dispatch({ type: FOCUS_CHANGE });
  };

  return (
    <View style={styles.formControl}>
      <TextInput
        autoComplete="off"
        label={'Please select'}
        placeholder={'Select your answer'}
        value={inputState.label}
        onChangeText={(text: string) => textChangeHandler(text, true)}
        onFocus={handleFocus}
        onBlur={lostFocusHandler}
        disabled={props.disabled}
        right={
          <TextInput.Icon
            name="arrow-down-bold"
            color={inputState.focus ? '#6200EE' : 'gray'}
          />
        }
      />
      {inputState.focus && (
        <View
          style={{
            backgroundColor: 'white',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            paddingBottom: 16,
            paddingHorizontal: 16,
            height: 190,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
          }}
        >
          <ScrollView keyboardShouldPersistTaps="handled">
            {inputState.filteredArray &&
              inputState.filteredArray.map((item: SelectItem, key: number) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    // lostFocusHandler()
                    textChangeHandler(item.labelText.en, false);
                  }}
                  activeOpacity={1}
                >
                  <View>
                    <Text
                      style={{ paddingVertical: 8, fontSize: 16 }}
                      key={key}
                    >
                      {item.labelText.en}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
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
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
});

export default Select;
