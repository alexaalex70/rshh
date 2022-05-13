import React, { Dispatch, SetStateAction } from 'react';
import { PaperModal } from '../../Atoms/PaperModal/PaperModal';
type LogoutModalProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  logout: () => {};
};
export const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  setVisible,
  logout,
}) => {
  const confirm = () => {
    setVisible(false);
    logout();
  };
  const cancel = () => {
    setVisible(false);
  };
  return (
    <PaperModal
      isVisible={visible}
      buttonsProps={[
        { onPress: cancel, label: 'Cancel' },
        { onPress: confirm, label: 'Sign out' },
      ]}
      title={'Sign out'}
      content={'Are you sure you want to sign out?'}
    />
  );
};
