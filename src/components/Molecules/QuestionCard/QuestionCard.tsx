import React, { FC } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Section } from 'rh-shared';
import { Avatar, Divider } from 'react-native-paper';
import { PaperButton } from '../../Atoms';
import { colors } from '../../../config/colors';

const CardStatus: { [key: string]: string } = {
  RESPONDER_NEW: 'New',
  CREATOR_DRAFT: 'New',
  RESPONDER_DRAFT: 'Draft',
  RESPONDER_COMPLETE: 'Completed',
  EXPIRED: 'Expired',
};

const CardAction: { [key: string]: string } = {
  RESPONDER_NEW: 'Start',
  CREATOR_DRAFT: 'Start',
  RESPONDER_DRAFT: 'Resume',
  RESPONDER_COMPLETE: 'View Answers',
  EXPIRED: 'Expired',
};

const QuestionCard: FC<any> = ({ questionSet, handleCardAction }) => {
  const handleCardStatus = () => {
    if (questionSet && questionSet.state in CardStatus)
      return CardStatus[questionSet.state];

    return null;
  };

  const handleCardActionText = () => {
    if (questionSet && questionSet.state in CardAction)
      return CardAction[questionSet.state];

    return '';
  };

  const renderSection = (item: Section) => {
    return (
      <View style={styles.sectionWrapper}>
        <View style={styles.section}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.sectionTitle}>{item.title.external.en}</Text>
            <Text style={styles.sectionSubTitle}>
              {item.questions.length} questions
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            {handleCardStatus() === 'Completed' ? (
              <Avatar.Icon
                icon="check"
                size={40}
                color={colors.persianGreen}
                style={{ backgroundColor: colors.white }}
              />
            ) : null}
          </View>
        </View>
        {questionSet &&
        questionSet.sections[questionSet.sections.length - 1].title.external
          .en !== item.title.external.en ? (
          <Divider />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Avatar.Icon
          icon="comment-multiple"
          size={50}
          color={colors.black}
          style={{ backgroundColor: colors.white }}
        />
        <Text style={styles.headerText}>Questions</Text>
        <View
          style={
            handleCardStatus() === 'Completed'
              ? styles.roundCompleted
              : styles.roundUncompleted
          }
        >
          <Text style={styles.status}>{handleCardStatus()}</Text>
        </View>
      </View>
      <Divider />
      <View style={{ paddingTop: 20 }}>
        <FlatList
          data={questionSet && questionSet.sections}
          renderItem={({ item }) => renderSection(item)}
        />
      </View>
      <View
        style={{
          paddingVertical: 16,
          alignItems: 'flex-start',
          paddingLeft: 24,
        }}
      >
        <PaperButton
          label={handleCardActionText()}
          onPress={() => handleCardAction(questionSet)}
          style={
            questionSet && questionSet.state === 'RESPONDER_COMPLETE'
              ? styles.completedButton
              : styles.normalButton
          }
          labelStyle={
            questionSet && questionSet.state === 'RESPONDER_COMPLETE'
              ? styles.completedLabel
              : styles.normalLabel
          }
          mode="contained"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.alto,
    backgroundColor: 'white',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 21.5,
    paddingBottom: 19,
  },
  headerText: {
    fontWeight: '500',
    flex: 1,
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  status: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  sectionWrapper: {
    paddingLeft: 24,
    paddingRight: 27,
    paddingVertical: 5,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.1,
  },
  sectionSubTitle: {
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.15,
    color: colors.boulder,
  },
  roundUncompleted: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: colors.gallery,
    backgroundColor: colors.gallery,
  },
  roundCompleted: {
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: colors.aeroBlue,
    borderColor: colors.white,
  },
  completedButton: {
    backgroundColor: colors.white,
    borderColor: colors.electricViolet,
    borderWidth: 1,
  },
  completedLabel: {
    color: colors.electricViolet,
  },
  normalLabel: {
    color: colors.white,
  },
  normalButton: {
    backgroundColor: colors.electricViolet,
  },
});

export default QuestionCard;
