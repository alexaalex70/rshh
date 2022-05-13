// @ts-nocheck
import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Answer, Question, QuestionType, QuestionTypes } from '../../../types';
import translate from '../../../translation/translation';
import {
  InputField,
  Measurments,
  Select,
  RadioGroup,
  CheckboxGroup,
  Address1,
  DatePicker,
} from '../..';
import Autolink from 'react-native-autolink';

interface QuestionInterface {
  isOrgCode?: boolean;
  disabled: boolean;
  currentQuestion: Question;
  currentAnswer: {
    [key: string]: Answer;
  };
  handleAnswerChange: (value: any, isValid: boolean, id: string) => void;
}

const GeneratedQuestion: FC<QuestionInterface> = ({
  currentAnswer,
  currentQuestion,
  isOrgCode,
  disabled,
  handleAnswerChange,
}) => {
  const translation = translate.use().Generator;
  const translateOptions = translate.getOptions();
  // @ts-ignore: Unreachable code error
  const questionText =
    currentQuestion.questionText[translateOptions.language.toString()];

  const inputChangeHandler = (value: any, isValid: boolean, id: string) => {
    handleAnswerChange(value, isValid, id);
  };
  const initiallyValid = !!(
    currentAnswer &&
    (currentAnswer[currentQuestion.id].props.value || !currentQuestion.required)
  );
  const renderQuestionComponents = (questionType: QuestionType) => {
    switch (questionType) {
      case QuestionTypes.DateTime: {
        return (
          <DatePicker
            id={currentQuestion.id}
            disabled={disabled}
            required={currentQuestion.required}
            validate={currentQuestion.config.validate}
            mode={currentQuestion.config.dateTimeMode}
            inputChangeHandler={inputChangeHandler}
            initialValue={
              currentAnswer && currentAnswer[currentQuestion.id].props
                ? currentAnswer[currentQuestion.id].props
                : ''
            }
            initiallyValid={initiallyValid}
          />
        );
      }
      case QuestionTypes.TextField: {
        return (
          <InputField
            id={currentQuestion.id}
            disabled={disabled}
            multiline={currentQuestion.config.multiline}
            placeholder={
              (!disabled && currentQuestion.config.placeholder) || { en: ' ' }
            }
            labelText={
              (!disabled && currentQuestion.config.labelText) || { en: ' ' }
            }
            subType={currentQuestion.config.subType}
            validate={currentQuestion.config.validate}
            required={currentQuestion.required}
            rows={
              currentQuestion.config?.rows && currentQuestion.config.rows > 1
                ? currentQuestion.config.rows
                : undefined
            }
            inputChangeHandler={inputChangeHandler}
            errorText="Please enter a valid input!"
            initialValue={
              currentAnswer && currentAnswer[currentQuestion.id].props
                ? currentAnswer[currentQuestion.id].props
                : ''
            }
            initiallyValid={initiallyValid}
            isOrgCode={isOrgCode ? true : false}
          />
        );
      }
      case QuestionTypes.Selector: {
        return (
          <Select
            id={currentQuestion.id}
            disabled={disabled}
            options={currentQuestion.config.children}
            required={currentQuestion.required}
            onInputChange={inputChangeHandler}
            errorText="Please enter a valid input!"
            initialValue={
              currentAnswer && currentAnswer[currentQuestion.id].props
                ? currentAnswer[currentQuestion.id].props
                : undefined
            }
            initiallyValid={initiallyValid}
          />
        );
      }
      case QuestionTypes.RadioGroup: {
        return (
          <RadioGroup
            id={currentQuestion.id}
            disabled={disabled}
            children={currentQuestion.config.children}
            horizontal={currentQuestion.config.horizontal}
            required={currentQuestion.required}
            inputChangeHandler={inputChangeHandler}
            initialValue={
              currentAnswer && currentAnswer[currentQuestion.id].props
                ? currentAnswer[currentQuestion.id].props
                : undefined
            }
            initiallyValid={initiallyValid}
          />
        );
      }
      case QuestionTypes.CheckboxGroup: {
        return (
          <CheckboxGroup
            id={currentQuestion.id}
            disabled={disabled}
            children={currentQuestion.config.children}
            horizontal={currentQuestion.config.horizontal}
            required={currentQuestion.required}
            onInputChange={inputChangeHandler}
            initialValue={
              currentAnswer && currentAnswer[currentQuestion.id].props
                ? currentAnswer[currentQuestion.id].props
                : undefined
            }
            initiallyValid={
              !!(
                currentAnswer &&
                currentAnswer[currentQuestion.id].props.value &&
                !currentQuestion.required
              )
            }
          />
        );
      }
      case QuestionTypes.DateTimePicker: {
        return <Text>date</Text>;
      }
      case QuestionTypes.HeightField: {
        return (
          <Measurments
            id={currentQuestion.id}
            disabled={disabled}
            measure={currentQuestion.config.measure}
            units={currentQuestion.config.units}
            required={currentQuestion.required}
            onInputChange={inputChangeHandler}
            errorText="Please enter a valid input!"
            initialValue={
              currentAnswer && currentAnswer[currentQuestion.id].props
                ? currentAnswer[currentQuestion.id].props
                : undefined
            }
            initiallyValid={initiallyValid}
          />
        );
      }
      case QuestionTypes.WeightField: {
        return (
          <Measurments
            id={currentQuestion.id}
            measure={currentQuestion.config.measure}
            disabled={disabled}
            units={currentQuestion.config.units}
            required={currentQuestion.required}
            onInputChange={inputChangeHandler}
            errorText="Please enter a valid input!"
            initialValue={
              currentAnswer && currentAnswer[currentQuestion.id].props
                ? currentAnswer[currentQuestion.id].props
                : undefined
            }
            initiallyValid={initiallyValid}
          />
        );
      }
      case QuestionTypes.CircumferenceField: {
        return (
          <Measurments
            id={currentQuestion.id}
            disabled={disabled}
            measure={currentQuestion.config.measure}
            units={currentQuestion.config.units}
            required={currentQuestion.required}
            onInputChange={inputChangeHandler}
            errorText="Please enter a valid input!"
            initialValue={
              currentAnswer && currentAnswer[currentQuestion.id].props
                ? currentAnswer[currentQuestion.id].props
                : undefined
            }
            initiallyValid={initiallyValid}
          />
        );
      }
      case QuestionTypes.Address1: {
        return (
          <Address1
            id={currentQuestion.id}
            disabled={disabled}
            config={currentQuestion.config}
            required={currentQuestion.required}
            inputChangeHandler={inputChangeHandler}
            initialValue={
              currentAnswer && currentAnswer[currentQuestion.id].props
                ? currentAnswer[currentQuestion.id].props
                : undefined
            }
            initiallyValid={initiallyValid}
          />
        );
      }
      default: {
        return (
          <Text style={styles.questionStyle}>
            Currently working on this component to enhance!
          </Text>
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Autolink
          style={styles.questionStyle}
          text={translation.question({ question: questionText })}
          linkStyles={{ color: 'blue' }}
          showAlert
        />
      </View>
      <View style={{ flex: 3, justifyContent: 'center' }}>
        {renderQuestionComponents(currentQuestion.type)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  questionStyle: {
    fontWeight: '500',
    letterSpacing: 0.15,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  container: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: '4%',
    flexDirection: 'column',
    paddingTop: '15%',
  },
});

export default GeneratedQuestion;
