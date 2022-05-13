import * as React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Checkbox } from 'react-native-paper';

export const CheckBoxGroup = () => {
  const [GroupCheckBoxItem, setGroupCheckBoxItem] = React.useState(mock);

  return (
    <View style={styles.GroupWrapper}>
      <View style={{ alignItems: 'center', marginBottom: '25%' }}>
        <Text style={[styles.titleText]}>
          {GroupCheckBoxItem.questionText.en}
        </Text>
      </View>
      {GroupCheckBoxItem.children.map((select, key) => (
        <View
          key={key}
          style={[
            styles.answerWrapper,
            GroupCheckBoxItem.horizontal
              ? {
                  flexDirection: 'row',
                }
              : null,
          ]}
        >
          <View style={styles.checkboxWithText}>
            <View stle={styles.checkBoxStyle}>
              <Checkbox
                status={
                  GroupCheckBoxItem.children[key].defaultSelected
                    ? select.value === 'Y'
                      ? 'checked'
                      : 'unchecked'
                    : 'unchecked'
                }
                onPress={() => {
                  let childrenUpdate = GroupCheckBoxItem.children;
                  childrenUpdate[key].value = GroupCheckBoxItem.defaultValue
                    ? select.value === 'Y'
                      ? 'Y'
                      : 'N'
                    : 'Y';
                  childrenUpdate[key].defaultSelected =
                    !childrenUpdate[key].defaultSelected;

                  setGroupCheckBoxItem({
                    ...GroupCheckBoxItem,
                    children: [...childrenUpdate],
                  });
                }}
              />
            </View>
            <Text style={styles.checkText}>{select.label.en}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  GroupWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '25%',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  answerWrapper: {
    margin: '5%',
    paddingLeft: '4%',
    display: 'flex',
  },
  checkText: {
    fontSize: 24,
    marginLeft: '4%',
  },
  checkboxWithText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxStyle: {
    ...Platform.select({
      ios: {
        borderRadius: 50,
        borderWidth: 1.5,
        zIndex: 999,
        backgroundColor: 'red',
        width: 50,
        height: 50,
      },
    }),
  },
});

const mock = {
  id: '01fh8bp08ayf3t10nyqw9ysd0y',
  type: 'CheckboxGroup',
  accessibilityDescription: null,
  conditional: null,
  disabled: false,
  helpText: null,
  hint: {
    title: {
      en: 'Data access permission',
    },
    body: {
      en: 'Your NHS Record gives our clincian valuable medical information from your GP so that we can best manage your condition',
    },
  },
  label: null,
  questionText: {
    en: 'Data access permission',
  },
  required: false,
  validate: {
    autoMax: null,
    autoMin: null,
    maxDate: null,
    maxLength: null,
    maxValue: null,
    minDate: null,
    minLength: null,
    minValue: null,
    regex: null,
  },
  defaultValue: null,
  horizontal: false,
  maxRows: null,
  minRows: null,
  multiline: false,
  placeholder: null,
  renderCase: null,
  rows: null,
  size: null,
  subType: null,
  children: [
    {
      id: '01fh8bp08ayf3t10nyqw9ysd0y.0',
      accessibilityDescription: null,
      defaultSelected: false,
      label: {
        en: 'I grant permission for you to access my NHS Record',
      },
      question: null,
      value: 'Y',
    },
  ],
  dateTimeMode: null,
  createdAt: '2021-10-05T13:53:25.258Z',
};

export default CheckBoxGroup;
