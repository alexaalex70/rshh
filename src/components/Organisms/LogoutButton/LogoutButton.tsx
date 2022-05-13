import React, { useState } from 'react';
import { signOutByDispatch } from '../../../utils/signOutByDispatch';
import { useDispatch } from 'react-redux';
import { LogoutModal } from '../LogoutModal/LogoutModal';
import { PaperButton } from '../../Atoms';

type LogoutButtonProps = { color: string };
export const LogoutButton: React.FC<LogoutButtonProps> = ({
  color = 'white',
}) => {
  const dispatch = useDispatch();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const showModal = async () => {
    setLogoutModalVisible(true);
  };

  const logout = async () => {
    console.log('Logging out');
    await signOutByDispatch(dispatch);
  };

  return (
    <>
      <PaperButton
        label="Sign out"
        onPress={showModal}
        mode="text"
        labelStyle={{ textTransform: 'uppercase', color }}
      />
      <LogoutModal
        visible={logoutModalVisible}
        setVisible={setLogoutModalVisible}
        logout={logout}
      />
    </>
  );
};
