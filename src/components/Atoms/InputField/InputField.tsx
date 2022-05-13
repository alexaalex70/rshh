import React, { FC, useReducer, useEffect } from 'react';
import { KeyboardTypeOptions, Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { TextField as TextFieldInterfaceConfig } from 'rh-shared';
import translate from '../../../translation/translation';

interface AdditionalInterface {
  inputChangeHandler(value: any, isValid: any, id: string): void;
  initialValue: any;
  initiallyValid: boolean;
  required: boolean;
  errorText: string;
  validate: any;
  isOrgCode: boolean;
  disabled: boolean;
  multiline: boolean;
  rows?: number;
}

interface InputInterface {
  value: string;
  isValid: boolean;
  touched: boolean;
}

type TextFieldInterface = TextFieldInterfaceConfig & AdditionalInterface;

enum KeyboardType {
  INTEGER = 'number-pad',
  DECIMAL = 'decimal-pad',
  TEL = 'phone-pad',
  EMAIL = 'email-address',
  TEXT = 'default',
}

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state: InputInterface, action: any) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
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

const InputField: FC<any> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    // @ts-ignore: Unreachable code error
    value:
      props.initialValue && props.initialValue.value
        ? props.initialValue.value
        : '',
    isValid: props.initiallyValid,
    touched: false,
  });

  const { inputChangeHandler, id }: any = props;

  useEffect(() => {
    if (inputState.touched || inputState.isValid) {
      inputChangeHandler({ value: inputState.value }, inputState.isValid, id);
    }
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputState, id]);

  const translation = translate.use().TextField;
  const translationOptions = translate.getOptions();
  let label = '';
  let placeHolder = '';

  if (props.labelText) {
    // @ts-ignore: Unreachable code error
    label = props.labelText[translationOptions.language.toString()];
  }

  if (props.placeholder) {
    // @ts-ignore: Unreachable code error
    placeHolder = props.placeholder[translationOptions.language.toString()];
  }

  let keyboardType: KeyboardTypeOptions;
  // @ts-ignore: Unreachable code error
  if (props.subType in KeyboardType) keyboardType = KeyboardType[props.subType];
  else keyboardType = 'default';

  const validation = (text: string) => {
    let isValid = true;

    if (!props.initiallyValid) isValid = false;

    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (
      props.validate.maxLength &&
      text.trim().length > props.validate.maxLength
    )
      isValid = false;
    if (
      props.validate.minLength &&
      text.trim().length < props.validate.minLength
    )
      isValid = false;
    if (props.validate.maxValue && Number(text) > props.validate.maxValue)
      isValid = false;
    if (props.validate.minValue && Number(text) < props.validate.minValue)
      isValid = false;
    if (props.validate.regex) {
      let reg = props.validate.regex;
      if (props.validate.regex[0] !== '/') reg = new RegExp(reg);
      if (!reg.test(text)) isValid = false;
    }

    return isValid;
  };

  const textChangeHandler = (text: string) => {
    const isValid = validation(text);

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View
      style={[
        styles.formControl,
        props.multiline ? { height: 160 } : { height: 80 },
      ]}
    >
      <TextInput
        {...props}
        label={translation.label({ label: label })}
        placeholder={translation.placeHolder({ placeHolder: placeHolder })}
        keyboardType={keyboardType}
        value={inputState.value}
        onChangeText={(text: string) => textChangeHandler(text)}
        onBlur={lostFocusHandler}
        onFocus={() => dispatch({ type: INPUT_BLUR })}
        autoCorrect={false}
        autoComplete="off"
        disabled={props.disabled}
        multiline={props.multiline}
        autoCapitalize={props.isOrgCode ? 'characters' : 'none'}
        maxLength={props.validate.maxLength}
        numberOfLines={props.rows ? props.rows : undefined}
      />
      {((!inputState.isValid && inputState.touched) ||
        (!validation(inputState.value) && inputState.value.length > 0)) && (
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

export default InputField;
