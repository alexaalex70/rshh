import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

// maxRows, minRows, defaultValue, rows, size, renderCase, validate: { minLength, minValue, maxLength, regex }

export default function TextField({
  labelText,
  defaultValue,
  maxRows,
  minRows,
  multiline,
  placeholder,
  renderCase,
  rows,
  size,
  subType,
  ...rest
}) {
  return (
    <View style={{ width: '90%' }}>
      <TextInput
        label={labelText}
        placeholder={placeholder}
        multiline={multiline}
        keyboardType={subType}
        {...rest}
      />
    </View>
  );
}

TextField.defaultProps = {};

TextField.propTypes = {};
