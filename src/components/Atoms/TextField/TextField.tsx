import React, { FC, useState, useEffect } from 'react';
import { KeyboardTypeOptions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { TextField as TextFieldInterfaceConfig } from 'rh-shared';
import translate from '../../../translation/translation';

interface AdditionalInterface {
  handleValueChange(updatedAnswer: any): void;
  answer: any;
}

type TextFieldInterface = TextFieldInterfaceConfig & AdditionalInterface;

const TextField: FC<TextFieldInterface> = ({
  labelText,
  placeholder,
  subType,
  multiline,
  defaultValue,
  answer,
  handleValueChange,
  ...props
}) => {
  const [text, onChangeText] = useState<string>('');
  const translation = translate.use().TextField;
  const translationOptions = translate.getOptions();
  let label = '';
  let placeHolder = '';

  //to modify the trigger labelText, maybe an ID
  useEffect(() => {
    if (defaultValue && !answer) onChangeText(defaultValue);
    else onChangeText(answer);

    onChangeText('');
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, labelText]);

  useEffect(() => {
    if (text !== defaultValue && text !== answer)
      handleValueChange({ value: text });
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  if (labelText) {
    // @ts-ignore: Unreachable code error
    label = labelText[translationOptions.language.toString()];
  }

  if (placeholder) {
    // @ts-ignore: Unreachable code error
    placeHolder = placeholder[translationOptions.language.toString()];
  }

  let keyboardType: KeyboardTypeOptions = 'default';

  switch (subType) {
    case 'INTEGER': {
      keyboardType = 'number-pad';
      break;
    }
    case 'DECIMAL': {
      keyboardType = 'decimal-pad';
      break;
    }
    case 'TEL': {
      keyboardType = 'phone-pad';
      break;
    }
    case 'EMAIL': {
      keyboardType = 'email-address';
      break;
    }
    default:
      keyboardType = 'default';
  }

  return (
    <TextInput
      label={translation.label({ label: label })}
      placeholder={translation.placeHolder({ placeHolder: placeHolder })}
      multiline={multiline}
      keyboardType={keyboardType}
      value={text}
      onChangeText={onChangeText}
    />
  );
};

export default TextField;
