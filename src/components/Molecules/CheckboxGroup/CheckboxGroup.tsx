import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, RadioButton } from 'rh-shared';
import { CustomText, PaperCheckbox } from '../..';
import { globalStyles } from '../../../config/globalStyles';

interface CheckboxGroupInterface {
  id: string;
  inputChangeHandler(value: any, isValid: any, id: string): void;
  initialValue: any;
  required: boolean;
  children: RadioButton[];
  horizontal: boolean;
  initiallyValid: boolean;
  disabled: boolean;
}

interface CheckItem {
  item: string[];
  valid: boolean;
}

const CheckboxGroup: FC<CheckboxGroupInterface> = (props) => {
  // @ts-ignore: Unreachable code error
  const [checkGroupState, setCheckGroupState] = useState<CheckItem>(
    props.initialValue && props.initialValue.value
      ? {
          // @ts-ignore: Unreachable code error
          item: [...props.initialValue.value],
          valid: props.initiallyValid,
        }
      : { item: [], valid: false }
  );

  const { onInputChange, id }: any = props;

  useEffect(() => {
    if (checkGroupState) {
      onInputChange(
        { value: [...checkGroupState.item] },
        checkGroupState.item.length > 0 ? true : checkGroupState.valid,
        id
      );
    }
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkGroupState, id]);

  const handleStatus = (id: string) => {
    if (checkGroupState && checkGroupState.item.includes(id)) return 'checked';
    return 'unchecked';
  };

  const handleOnPress = (id: string) => {
    if (checkGroupState.item.length === 0)
      setCheckGroupState({ item: [id], valid: true });
    else if (!checkGroupState.item.includes(id))
      setCheckGroupState((prevState: any) => {
        return { item: [...prevState.item, id], valid: true };
      });
    else
      setCheckGroupState((prevState: any) => {
        const filtered = prevState.item.filter((item: string) => item !== id);

        return { item: filtered, valid: filtered.length !== 0 };
      });
  };

  return (
    <View style={[props.horizontal ? styles.displayHorizontal : null]}>
      {props.children.map((item: Checkbox, key: any) => {
        return (
          <View
            key={key}
            style={[styles.checkBoxButtonWrapper, globalStyles.line]}
          >
            <PaperCheckbox
              value={key}
              id={item.id}
              onPress={(key: string) => handleOnPress(key)}
              status={handleStatus(item.id)}
              disabled={props.disabled}
            />
            <CustomText
              style={[globalStyles.questionText, { marginLeft: 0, flex: 2 }]}
              accessibilityDescription={item.accessibilityDescription?.en}
            >
              {item.labelText.en}
            </CustomText>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  checkBoxButtonWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 12,
  },
  checkGroupWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  displayHorizontal: {
    flexDirection: 'row',
  },
});

export default CheckboxGroup;
