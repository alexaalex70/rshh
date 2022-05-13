import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';
import { AddressFieldConfig } from 'rh-shared';
import { InputField } from '../..';

interface Address1Interface {
  id: string;
  config: {
    [key: string]: AddressFieldConfig;
  };
  inputChangeHandler(value: any, isValid: any, id: string): void;
  initialValue: any;
  initiallyValid: boolean;
  required: boolean;
  disabled: boolean;
}

interface AddressStateInterface {
  value: {
    addressline1: string;
    addressline2: string;
    city: string;
    postcode: string;
  };
  valid: {
    addressline1: boolean;
    addressline2: boolean;
    city: boolean;
    postcode: boolean;
  };
}

const Address1: FC<Address1Interface> = (props) => {
  const [addressState, setAddrressState] = useState<AddressStateInterface>({
    value: {
      addressline1: props.initialValue.addressline1
        ? props.initialValue.addressline1
        : '',
      addressline2: props.initialValue.addressline2
        ? props.initialValue.addressline2
        : '',
      city: props.initialValue.city ? props.initialValue.city : '',
      postcode: props.initialValue.postcode ? props.initialValue.postcode : '',
    },
    valid: {
      addressline1: false,
      addressline2: false,
      city: false,
      postcode: false,
    },
  });

  useEffect(() => {
    // if (
    // addressState.valid.addressline1 &&
    // addressState.valid.addressline2 &&
    // addressState.valid.city &&
    // addressState.valid.postcode
    // ) {
    props.inputChangeHandler({ ...addressState.value }, true, props.id);
    //}
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id, addressState]);

  const onChangeHandler = (value: any, isValid: boolean, id: string) => {
    const newAddress = { ...addressState };
    // @ts-ignore: Unreachable code error
    newAddress.value[id] = value.value;
    // @ts-ignore: Unreachable code error
    newAddress.valid[id] = isValid;

    setAddrressState(newAddress);
  };

  return (
    <View>
      {Object.entries(props.config).map(([key, val]) => (
        <View key={key} style={{ margin: 8 }}>
          <InputField
            id={key}
            disabled={props.disabled}
            multiline={false}
            subType={'TEXT'}
            labelText={val.labelText}
            validate={val.validate}
            required={val.required}
            inputChangeHandler={onChangeHandler}
            initialValue={
              // @ts-ignore: Unreachable code error
              addressState && addressState.value[key]
                ? // @ts-ignore: Unreachable code error
                  { value: addressState.value[key] }
                : ''
            }
            initiallyValid={
              props.initialValue &&
              // @ts-ignore: Unreachable code error
              (props.initialValue[key] || !val.required)
                ? true
                : false
            }
            isOrgCode={key === 'postcode' ? true : false}
          />
        </View>
      ))}
    </View>
  );
};

export default Address1;
