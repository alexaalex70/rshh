import React, { FC, useState, useEffect } from 'react';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  StatusBar,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { Answer, QuestionSet } from '../../types';
import { Question } from '../../types';
import { Section } from '../../types';
import { AnswerBody } from '../../types';
import { QuestionTypes } from '../../types';
import { patchQuestionSetById, resetQuestionSet } from '../../store/actions';
import { updateQuestionSetInformation, deleteEvent } from '../../store/actions';
import { FooterWithCTA, GeneratedQuestion } from '../../components';
import DialogBox from '../../components/Molecules/DialogBox/DialogBox';
import { colors } from '../../config/colors';
import { useHeaderHeight } from '@react-navigation/elements';
import { REACT_APP_QS_API } from '@env';

enum QuestionState {
  CREATOR_DRAFT = 'CREATOR_DRAFT',
}

interface ValidationInterface {
  dependentQuestionId: string;
  value: string;
}

interface QuestionInterface {
  question: Question;
  validations?: Array<ValidationInterface>;
}

interface CurrentQuestionInterface {
  answers: {
    [key: string]: Answer;
  };
  questions: Array<QuestionInterface>;
  isValid: boolean;
  currentAnswer: {
    [key: string]: Answer;
  };
}

interface IndexInterface {
  value: number;
  id: string;
}

interface CurrentQuestionSetInterface {
  questions: Array<Question>;
  currentIndex: IndexInterface;
}
const recursiveParseNestedObject = (
  question: Question,
  qSet: QuestionSet,
  parentQuestionId: string,
  parentQuestionValue: string
) => {
  let result: any = [];

  // @ts-ignore: Unreachable code error
  if (question.config.children)
    // @ts-ignore: Unreachable code error
    question.config.children.map((children) => {
      // @ts-ignore: Unreachable code error
      if (children.question)
        result = [
          ...result,
          ...recursiveParseNestedObject(
            children.question,
            qSet,
            question.id,
            children.value
          ),
        ];
    });

  result.push({
    answer: qSet?.answers[question.id],
    answerId: question.id,
    question: question,
    validations: {
      value: parentQuestionValue,
      id: parentQuestionId,
    },
  });

  return result;
};
const GeneratorScreen: FC<any> = ({ route, navigation }) => {
  const { hint, hintStatus } = useSelector(
    (state: RootState) => state.questionSetInfo
  );
  const { questionSet: qs } = useSelector(
    (state: RootState) => state.questionSet
  );
  const { profile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const [currentQuestionSet, setCurrentQuestionSet] =
    useState<CurrentQuestionSetInterface>();
  const [currentQuestion, setCurrentQuestion] =
    useState<CurrentQuestionInterface>({
      answers: {},
      questions: [],
      isValid: false,
      currentAnswer: {},
    });
  console.log('Generator route: ', route);
  console.log('Generator route params: ', route.params);
  const { channelId, questionSet: initQuestionSet } = route.params;
  const [questionSet, setQuestionSet] = useState<any>(qs); // ??
  const [preview, setPreview] = useState(false);
  const [inProgress, setInProgress] = useState<boolean>(true);
  const [backRecursion, setBackRecursion] = useState<boolean>(false);

  const headerHeight = useHeaderHeight();

  useEffect(() => {
    if (qs) setQuestionSet(qs);
  }, [qs]);

  useEffect(() => {
    const publishQuestionSet = async () => {
      if (questionSet)
        await fetch(
          `${REACT_APP_QS_API}/questionset/${questionSet.id}/publish`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              newStackId: questionSet.stackIds[0],
              dryRun: false,
            }),
          }
        );
    };
    let questions: Array<Question> = [];
    let currentIndex: IndexInterface = {
      value: 0,
      id: '',
    };

    if (questionSet) {
      console.log('Questionset: ', questionSet);
      if (questionSet.state in QuestionState) publishQuestionSet();

      questionSet.sections.map(
        (section: Section) => (questions = [...questions, ...section.questions])
      );

      if (questionSet.focusOnQuestion) {
        questions.find((question: Question, key: number) => {
          if (question.id === questionSet.focusOnQuestion)
            currentIndex = {
              value: key,
              id: question.id,
            };
        });
      } else currentIndex.id = questions[0].id;
    }
    setCurrentQuestionSet({
      questions,
      currentIndex,
    });
  }, [questionSet]);

  useEffect(() => {
    if (questionSet && questionSet.state !== 'RESPONDER_COMPLETE') {
      if (
        questionSet &&
        currentQuestionSet &&
        currentQuestionSet.questions.length !==
          currentQuestionSet.currentIndex.value
      ) {
        let emptyQuestion: CurrentQuestionInterface = {
          answers: {},
          questions: [],
          isValid: false,
          currentAnswer: {},
        };

        const question: Question =
          currentQuestionSet.questions[currentQuestionSet.currentIndex.value];

        if (
          QuestionTypes.RadioGroup === question.type ||
          QuestionTypes.Selector === question.type ||
          QuestionTypes.CheckboxGroup === question.type
        ) {
          const response = recursiveParseNestedObject(
            question,
            questionSet,
            '',
            ''
          ).reverse();

          response.map((res: any) => {
            emptyQuestion.answers[res.answerId] = res.answer;
            emptyQuestion.currentAnswer[res.answerId] = res.answer;
            emptyQuestion.questions.push({
              question: res.question,
              validations: [
                {
                  dependentQuestionId: res.validations.id,
                  value: res.validations.value,
                },
              ],
            });
          });
          if (!question.required) emptyQuestion.isValid = true;
          if (
            // @ts-ignore: Unreachable code error
            !Object.keys(
              questionSet.answers[currentQuestionSet.currentIndex.id]?.props
            ).length === 0
          ) {
            emptyQuestion.isValid = true;
          }
        } else {
          emptyQuestion.answers[question.id] = questionSet.answers[question.id];
          emptyQuestion.currentAnswer[question.id] =
            questionSet.answers[question.id];
          emptyQuestion.questions.push({
            question,
          });
          if (!question.required) emptyQuestion.isValid = true;
          if (
            // @ts-ignore: Unreachable code error
            !Object.keys(
              questionSet.answers[currentQuestionSet.currentIndex.id]?.props
            ).length === 0
          ) {
            emptyQuestion.isValid = true;
          }
        }

        dispatch(
          updateQuestionSetInformation({
            hint: emptyQuestion.questions[0].question.hint
              ? emptyQuestion.questions[0].question.hint
              : {
                  title: { en: '' },
                  body: { en: '' },
                },
            questionIndex:
              currentQuestionSet.currentIndex.value /
              (currentQuestionSet.questions.length - 1),
          })
        );
        setCurrentQuestion(emptyQuestion);
      }
    } else setPreview(true);
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionSet]);

  const handlePreviousQuestion = () => {
    if (questionSet && currentQuestionSet) {
      let answer: AnswerBody = {
        answers: currentQuestion.isValid
          ? { ...currentQuestion.answers }
          : { ...currentQuestion.currentAnswer },
        state: 'RESPONDER_DRAFT',
        focusOnQuestion:
          currentQuestionSet.questions[
            currentQuestionSet.currentIndex.value - 1
          ].id,
      };

      dispatch(
        patchQuestionSetById({
          questionSetId: questionSet.id,
          body: answer,
        })
      );

      setCurrentQuestion({
        answers: {},
        questions: [],
        isValid: false,
        currentAnswer: {},
      });

      if (
        currentQuestionSet &&
        // @ts-ignore: Unreachable code error
        currentQuestionSet.questions[currentQuestionSet.currentIndex.value - 1]
          .displayCondition &&
        // @ts-ignore: Unreachable code error
        currentQuestionSet.questions[
          currentQuestionSet.currentIndex.value - 1
        ].displayCondition.includes(profile.body.sexAtBirth)
      )
        setBackRecursion(true);
      else setBackRecursion(false);
    }
  };

  const handleNextQuestion = () => {
    if (
      currentQuestionSet &&
      currentQuestionSet.currentIndex.value + 1 !==
        currentQuestionSet.questions.length
    ) {
      if (questionSet) {
        const answer: AnswerBody = {
          answers: { ...currentQuestion.answers },
          state: 'RESPONDER_DRAFT',
          focusOnQuestion:
            currentQuestionSet.questions[
              currentQuestionSet.currentIndex.value + 1
            ].id,
        };

        dispatch(
          patchQuestionSetById({
            questionSetId: questionSet.id,
            body: answer,
          })
        );

        setCurrentQuestion({
          answers: {},
          questions: [],
          isValid: false,
          currentAnswer: {},
        });
      }
    } else setPreview(true);
  };

  const handleAnswerChange = (value: any, isValid: boolean, id: string) => {
    if (!preview) {
      let copyQuestion = { ...currentQuestion };

      copyQuestion.answers[id].props = { ...value };
      copyQuestion.answers[id].state = 'COMPLETE';
      copyQuestion.isValid = isValid;

      setCurrentQuestion(copyQuestion);
    }
  };

  const checkValidaty = () => {
    if (
      currentQuestionSet &&
      currentQuestionSet.questions[currentQuestionSet.currentIndex.value]
        .type === QuestionTypes.DateTime
    ) {
      return false;
    }

    return !currentQuestion.isValid;
  };

  useEffect(() => {
    if (
      currentQuestionSet &&
      !preview &&
      currentQuestionSet.currentIndex.value + 1 ===
        currentQuestionSet.questions.length
    )
      navigation.navigate('Questions', {
        channelId: channelId,
        questionSet: questionSet,
      });
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview]);

  const handleSubmit = () => {
    if (questionSet && currentQuestionSet) {
      dispatch(
        patchQuestionSetById({
          questionSetId: questionSet.id,
          body: {
            answers: { ...questionSet.answers },
            focusOnQuestion: currentQuestionSet.currentIndex.id,
            state: 'RESPONDER_COMPLETE',
          },
        })
      );
      dispatch(deleteEvent({ questionSetId: questionSet.id }));
      setInProgress(false);
      dispatch(resetQuestionSet());
    }
  };

  const handleBackToQuestionSet = () => {
    console.log('Going back to questionset');
    setPreview(false);
  };

  useEffect(() => {
    if (!inProgress)
      setTimeout(() => {
        navigation.navigate('Question Card', channelId);
      }, 3000);
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inProgress]);

  if (!inProgress) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Avatar.Icon
          icon="check"
          size={80}
          color={colors.white}
          style={{ backgroundColor: colors.electricViolet }}
        />
        <Text style={[styles.doneTextStyle, { marginTop: '10%' }]}>
          All done
        </Text>
      </View>
    );
  }

  const renderItem = ({ item, index }: any) => {
    let response: any;
    if (
      QuestionTypes.RadioGroup === item.type ||
      QuestionTypes.Selector === item.type ||
      QuestionTypes.CheckboxGroup === item.type
    )
      response = recursiveParseNestedObject(
        item,
        questionSet,
        '',
        ''
      ).reverse();

    if (
      item &&
      item.displayCondition &&
      item.displayCondition.match(
        new RegExp('\\b' + profile.body.sexAtBirth + '\\b')
      ) != null
    )
      return <></>;

    return (
      <View>
        {questionSet && !response ? (
          <GeneratedQuestion
            currentQuestion={item}
            currentAnswer={questionSet.answers}
            handleAnswerChange={handleAnswerChange}
            key={item.id}
            isOrgCode={false}
            disabled={true}
          />
        ) : (
          response.map((responseItem: any, key: number) => {
            if (questionSet) {
              if (key > 0) {
                if (
                  (QuestionTypes.RadioGroup === item.type ||
                    QuestionTypes.Selector === item.type) &&
                  response[key - 1].answer.props.value ===
                    responseItem.validations.value
                )
                  return (
                    <GeneratedQuestion
                      currentQuestion={responseItem.question}
                      currentAnswer={questionSet.answers}
                      handleAnswerChange={handleAnswerChange}
                      key={responseItem.question.id}
                      isOrgCode={false}
                      disabled={true}
                    />
                  );
                else if (
                  QuestionTypes.CheckboxGroup === item.type &&
                  response[key - 1].answer.props.value.includes(
                    responseItem.validations.value
                  )
                )
                  return (
                    <GeneratedQuestion
                      currentQuestion={responseItem.question}
                      currentAnswer={questionSet.answers}
                      handleAnswerChange={handleAnswerChange}
                      key={responseItem.question.id}
                      isOrgCode={false}
                      disabled={true}
                    />
                  );
              }

              return (
                <GeneratedQuestion
                  currentQuestion={responseItem.question}
                  currentAnswer={questionSet.answers}
                  handleAnswerChange={handleAnswerChange}
                  key={responseItem.question.id}
                  isOrgCode={false}
                  disabled={true}
                />
              );
            }
            return null;
          })
        )}
      </View>
    );
  };

  return (
    <>
      {hint && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: hintStatus ? 99 : -1,
          }}
        >
          <DialogBox
            title={hint.title.en}
            supportingText={hint.body.en}
            visible={hintStatus}
          />
        </View>
      )}
      {questionSet && currentQuestionSet && preview ? (
        <SafeAreaView
          style={{
            flexDirection: 'column',
            flex: 1,
            backgroundColor: colors.white,
          }}
        >
          <View style={styles.container}>
            <FlatList
              data={currentQuestionSet.questions}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 32,
                  }}
                >
                  <Text style={{ fontSize: 24 }}>Here is your summary</Text>
                </View>
              }
            />

            {questionSet && questionSet.state !== 'RESPONDER_COMPLETE' ? (
              <View>
                <FooterWithCTA
                  secondaryCTA={{
                    label: 'Back',
                    onPress: handleBackToQuestionSet,
                    style: { backgroundColor: colors.white },
                    show:
                      currentQuestionSet?.currentIndex.value === 0 && !preview
                        ? false
                        : true,
                  }}
                  primaryCTA={{
                    label: 'Submit',
                    onPress: handleSubmit,
                    style: { backgroundColor: colors.white },
                    show: true,
                  }}
                />
              </View>
            ) : null}
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={{
            flexDirection: 'column',
            flex: 1,
            backgroundColor: colors.white,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={headerHeight + StatusBar.currentHeight}
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <ScrollView
                  contentContainerStyle={{ flexGrow: 1 }}
                  keyboardShouldPersistTaps="handled"
                >
                  {currentQuestion &&
                    currentQuestion.questions.map(
                      (question: QuestionInterface, key: number) => {
                        // @ts-ignore: Unreachable code error
                        if (
                          question.question.displayCondition &&
                          // @ts-ignore: Unreachable code error
                          question.question.displayCondition.match(
                            new RegExp('\\b' + profile.body.sexAtBirth + '\\b')
                          ) != null
                        ) {
                          if (!backRecursion) handleNextQuestion();
                          else handlePreviousQuestion();
                          return null;
                        }
                        if (key === 0)
                          return (
                            <GeneratedQuestion
                              currentQuestion={question.question}
                              currentAnswer={currentQuestion.answers}
                              handleAnswerChange={handleAnswerChange}
                              key={key}
                              disabled={false}
                            />
                          );
                        else if (currentQuestion.questions[key].validations) {
                          let isOrgCode = false;
                          let level = key;
                          if (
                            question.question.questionText.en.includes(
                              'organization'
                            )
                          )
                            isOrgCode = true;
                          // @ts-ignore: Unreachable code error
                          return currentQuestion.questions[key].validations.map(
                            (validateObj: ValidationInterface) => {
                              if (
                                level < 1 &&
                                currentQuestion.answers[
                                  validateObj.dependentQuestionId
                                ].props &&
                                currentQuestion.answers[
                                  validateObj.dependentQuestionId
                                ].props.value === validateObj.value
                              )
                                return (
                                  <GeneratedQuestion
                                    currentQuestion={question.question}
                                    currentAnswer={currentQuestion.answers}
                                    handleAnswerChange={handleAnswerChange}
                                    key={key}
                                    isOrgCode
                                    disabled={false}
                                  />
                                );
                              else if (level >= 1) {
                                let valid = true;
                                currentQuestion.questions.map(
                                  (item: any, key: number) => {
                                    if (
                                      key <= level &&
                                      key !== 0 &&
                                      currentQuestion.answers[
                                        // @ts-ignore: Unreachable code error
                                        currentQuestion.questions[key]
                                          .validations[0].dependentQuestionId
                                      ].props.value !==
                                        // @ts-ignore: Unreachable code error
                                        currentQuestion.questions[key]
                                          .validations[0].value
                                    )
                                      valid = false;
                                  }
                                );
                                if (valid)
                                  return (
                                    <GeneratedQuestion
                                      currentQuestion={question.question}
                                      currentAnswer={currentQuestion.answers}
                                      handleAnswerChange={handleAnswerChange}
                                      key={key}
                                      isOrgCode
                                      disabled={false}
                                    />
                                  );
                              }
                            }
                          );
                        }
                      }
                    )}
                </ScrollView>
                <View style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                  <FooterWithCTA
                    secondaryCTA={{
                      label: 'Back',
                      onPress: handlePreviousQuestion,
                      style: { backgroundColor: colors.white },
                      show:
                        currentQuestionSet?.currentIndex.value === 0
                          ? false
                          : true,
                    }}
                    primaryCTA={{
                      label: 'Next',
                      onPress: handleNextQuestion,
                      style: { backgroundColor: colors.white },
                      show: true,
                      disabled: checkValidaty(),
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    justifyContent: 'flex-end',
  },
  list: {
    flexGrow: 1,
  },
  doneTextStyle: {
    fontWeight: '600',
    letterSpacing: 0.15,
    lineHeight: 24,
    fontSize: 20,
  },
});

export default GeneratorScreen;
