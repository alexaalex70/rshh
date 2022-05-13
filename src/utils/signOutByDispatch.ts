import { Dispatch } from 'redux';
import { updateUserInformation } from '../store/actions';
import { Auth } from 'aws-amplify';

export const signOutByDispatch = async (dispatch: Dispatch) => {
  await Auth.signOut();
  dispatch(
    updateUserInformation({
      isLogged: false,
      isLoading: false,
      id: '',
      subId: '',
      idpKey: '',
      phoneNumber: '',
      token: '',
      refreshToken: '',
    })
  );
};
