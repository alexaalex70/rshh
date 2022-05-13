import React, { FC, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Provider, Dialog, Portal } from 'react-native-paper';
import { PaperButton } from '../../Atoms/PaperButton/PaperButton';
import { useDispatch } from 'react-redux';
import { updateHint } from 'rh-shared';
import { colors } from '../../../config/colors';

interface DialoBoxProps {
  visible: boolean;
  title: string;
  supportingText: string;
}

const DialogBox: FC<DialoBoxProps> = ({ visible, title, supportingText }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleOnClose = () => {
    dispatch(
      updateHint({
        hintStatus: false,
      })
    );
  };

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog
            visible={isVisible}
            onDismiss={handleOnClose}
            style={{ borderRadius: 8, backgroundColor: colors.white }}
          >
            <Dialog.Title style={{ color: colors.black }}>{title}</Dialog.Title>
            <Dialog.Content>
              <Text style={{ color: colors.black }}>{supportingText}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <PaperButton onPress={handleOnClose} label="Close" />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default DialogBox;
