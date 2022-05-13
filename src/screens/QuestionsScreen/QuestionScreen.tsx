import React, { FC, useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  QuestionSetState,
  RootState,
  QuestionType,
  QuestionTypes,
  MeasureUnit,
} from 'rh-shared';
import {
  FooterWithCTA,
  PaperCheckboxGroup,
  PaperRadioGroup,
  TabularMeasurement,
  TextField,
  ManualAddress,
} from '../../components';

const QuestionScreen: FC<any> = ({ route, navigation }) => {
  const { questionSet } = useSelector(
    (state: RootState) => state.questionSet
  ) as QuestionSetState;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    console.log('Route.params: ', route.params);
  });

  useEffect(() => {
    if (questionSet && questionSet.focusOnQuestion) {
      setCurrentQuestionIndex(parseInt(questionSet.focusOnQuestion));
    }
    setCurrentQuestionIndex(0);
  }, [questionSet]);

  const handleForward = () =>
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex !== undefined && prevIndex + 1 !== questionSet?.questions.length
        ? prevIndex + 1
        : prevIndex
    );

  const handleBack = () =>
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex !== undefined && prevIndex !== 0 ? prevIndex - 1 : prevIndex
    );

  const measurementComponent = (measure: string, units: Array<MeasureUnit>) => {
    return <TabularMeasurement measure={measure} units={units} />;
  };

  const renderQuestion = (questionType: QuestionType) => {
    // @ts-ignore: Unreachable code error
    let question = questionSet.questions[currentQuestionIndex];

    switch (questionType) {
      case QuestionTypes.Address1: {
        return (
          <ManualAddress
            addressline1={question.config.addressline1}
            addressline2={question.config.addressline2}
            city={question.config.city}
            postcode={question.config.postcode}
          />
        );
      }
      case QuestionTypes.TextField: {
        return (
          <TextField
            multiline={question.config.multiline}
            placeholder={question.config.placeholder}
            labelText={question.config.labelText}
            subType={question.config.subType}
            defaultValue={question.config.defaultValue}
            {...question.config}
          />
        );
      }
      case QuestionTypes.RadioGroup: {
        return (
          <PaperRadioGroup
            children={question.config.children}
            horizontal={question.config.horizontal}
          />
        );
      }
      case QuestionTypes.CheckboxGroup: {
        return (
          <PaperCheckboxGroup
            children={question.config.children}
            horizontal={question.config.horizontal}
          />
        );
      }
      case QuestionTypes.WeightField: {
        return measurementComponent(
          question.config.measure,
          question.config.units
        );
      }
      case QuestionTypes.HeightField: {
        return measurementComponent(
          question.config.measure,
          question.config.units
        );
      }
      case QuestionTypes.CircumferenceField: {
        return measurementComponent(
          question.config.measure,
          question.config.units
        );
      }
      default: {
        return (
          <Text style={styles.questionStyle}>
            Currently this components is not synced with generator.
          </Text>
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 5 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Text style={styles.questionStyle}>
                {currentQuestionIndex !== undefined && questionSet
                  ? questionSet.questions[currentQuestionIndex].questionText.en
                  : null}
              </Text>
            </View>
            <View
              style={{
                flex: 5.5,
                justifyContent: 'center',
                paddingHorizontal: '7%',
              }}
            >
              {currentQuestionIndex !== undefined && questionSet
                ? renderQuestion(
                    questionSet.questions[currentQuestionIndex].type
                  )
                : null}
            </View>
            <View style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
              <FooterWithCTA
                secondaryCTA={{ label: 'Back', onPress: handleBack }}
                primaryCTA={{ label: 'Next', onPress: handleForward }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  questionStyle: {
    fontWeight: '500',
    letterSpacing: 0.15,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default QuestionScreen;
