import React, { FC, useReducer, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton } from 'rh-shared';
import { CustomText, PaperRadioButton } from '../..';
import { globalStyles } from '../../../config/globalStyles';

interface RadioGroupInterface {
  id: string;
  inputChangeHandler: (value: any, isValid: any, id: string) => void;
  initialValue: any;
  required: boolean;
  children: any;
  horizontal: boolean;
  initiallyValid: boolean;
  disabled: boolean;
}

const RADIO_CHANGE = 'RADIO_CHANGE';

const radioGroupReducer = (state: any, action: any) => {
  switch (action.type) {
    case RADIO_CHANGE:
      return {
        ...state,
        value: action.value,
        valid: action.valid,
      };
    default:
      return state;
  }
};

const RadioGroup: FC<RadioGroupInterface> = (props) => {
  const [radioGroupState, dispatch] = useReducer(radioGroupReducer, {
    // @ts-ignore: Unreachable code error
    value: props.initialValue ? props.initialValue.value : '',
    valid: props.initiallyValid,
  });

  const { inputChangeHandler, id }: any = props;

  useEffect(() => {
    if (radioGroupState.value) {
      inputChangeHandler({ value: radioGroupState.value }, true, id);
    }
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioGroupState, id]);

  const handlePress = (value: any) =>
    dispatch({ type: RADIO_CHANGE, value: value, valid: true });

  const handleStatus = (answerValue: string, radioValue: string) => {
    if (answerValue === radioValue) return 'checked';

    return 'unchecked';
  };

  return (
    <View
      style={[
        styles.radioGroupWrapper,
        props.horizontal ? styles.displayHorizontal : null,
      ]}
    >
      {props.children.map((item: RadioButton, key: number) => (
        <View key={key} style={[styles.radioButtonWrapper, globalStyles.line]}>
          <PaperRadioButton
            value={item.value}
            status={handleStatus(radioGroupState.value, item.value)}
            onPress={(value: any) => handlePress(value)}
            disabled={props.disabled}
          />
          <CustomText
            style={[globalStyles.questionText]}
            accessibilityDescription={item.accessibilityDescription?.en}
          >
            {item.labelText.en}
          </CustomText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 12,
  },
  radioGroupWrapper: {
    display: 'flex',
  },
  displayHorizontal: {
    flexDirection: 'row',
  },
});

export default RadioGroup;
