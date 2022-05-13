import Modal from 'react-native-modal';
import React from 'react';
import { PaperButtonProps } from '../../../config/interfaces';
import { View, Text, StyleSheet } from 'react-native';
import PaperButton from '../PaperButton/PaperButton';
export type PaperModalProps = {
  isVisible: boolean;
  title?: string;
  content?: string | React.ReactElement;
  buttonsProps?: PaperButtonProps[];
};

export const PaperModal: React.FC<PaperModalProps> = ({
  isVisible,
  title,
  content,
  buttonsProps,
}) => {
  return (
    <Modal isVisible={isVisible} backdropColor="rgba(0, 0, 0, 0.32)">
      <View style={styles.wrapper}>
        {title && (
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
        {content && typeof content === 'string' && (
          <View style={styles.contentWrapper}>
            {<Text style={styles.content}>{content}</Text>}
          </View>
        )}
        {content && React.isValidElement(content) && (
          <View style={styles.contentWrapper}>{content}</View>
        )}
        {buttonsProps && (
          <View style={styles.buttonsWrapper}>
            {buttonsProps.map((buttonProps) => {
              return (
                <PaperButton
                  {...buttonProps}
                  labelStyle={{ ...styles.button, ...buttonProps.labelStyle }}
                />
              );
            })}
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    borderRadius: 8,
  },
  titleWrapper: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontWeight: '500',
  },
  contentWrapper: {
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 1.25,
  },
});
