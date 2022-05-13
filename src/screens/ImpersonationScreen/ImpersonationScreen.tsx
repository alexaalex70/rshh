import React, { FC, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileByIDPId } from '../../store/actions';
import { CustomText, PaperRadioButton } from '../../components';
import { colors } from '../../config/colors';
import { globalStyles } from '../../config/globalStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import { RHPfetch } from '../../config/apiWrapper';
import { REACT_APP_PROFILE_API } from '@env';
import { RootState } from '../../store/reducers/rootReducer';
import { UserInfoState } from '../../store/models';

const ImpersonationScreen: FC<any> = ({ navigation }) => {
  const disp = useDispatch();

  const [idpKey, setIdpKey] = useState<any>(undefined);
  const [items, setItems] = useState([
    { label: 'Myself', value: 'MYSELF' },
    { label: 'Member', value: 'MEMBER' },
    { label: 'Mentor', value: 'MENTOR' },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>(null);
  const [profiles, setProfiles] = useState<any>(null);
  const { token } = useSelector(
    (state: RootState) => state.user
  ) as UserInfoState;

  useEffect(() => {
    if (value && value !== 'MYSELF') {
      const takeProfiles = async (type: string) => {
        const res = RHPfetch(
          `${REACT_APP_PROFILE_API}/profile/impersonatable?profile_type=${type}`,
          {
            method: 'GET',
            headers: new Headers({
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            }),
          }
        );

        return res;
      };
      takeProfiles(value)
        .then((data: any) => {
          console.log('Result: ', JSON.stringify(data));
          setProfiles(data.body.profiles);
        })
        .catch((err) => console.error(err));
    }
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleStatus = (answerValue: string, radioValue: string) => {
    if (answerValue === radioValue) return 'checked';

    return 'unchecked';
  };

  const handleImpersonation = (key: string) => {
    console.log('IDP Key: ', key);
    setIdpKey(key);
  };

  const handleStart = () => {
    if (idpKey)
      disp(
        fetchProfileByIDPId({
          userId: idpKey,
          impersonate: value !== 'MYSELF',
        })
      );

    setTimeout(() => {
      navigation.reset({ index: 0, routes: [{ name: 'Homepage' }] });
    }, 500);
  };

  const renderItem = ({ item }: any) => {
    if (item.profileType === value)
      return (
        <View
          key={item.idpKey}
          style={[style.radioButtonWrapper, globalStyles.line]}
        >
          <PaperRadioButton
            value={item.idpKey}
            status={handleStatus(idpKey, item.idpKey)}
            onPress={(key: any) => handleImpersonation(key)}
            disabled={false}
          />
          <CustomText
            style={[globalStyles.questionText]}
            accessibilityDescription={item.accessibilityDescription?.en}
          >
            {item.givenName}
          </CustomText>
        </View>
      );
    return null;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <View style={style.screen}>
            <View style={style.card}>
              <Text style={style.cardTitle}>IMPERSONATION</Text>
              <Text style={style.carQuestion}>Who do you want to imitate?</Text>
              <View style={style.formControl}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
              </View>
              <SafeAreaView
                style={{
                  width: '80%',
                  marginTop: Dimensions.get('window').width * 0.05,
                  marginBottom: Dimensions.get('window').width * 0.05,
                  flex: 2,
                }}
              >
                {value &&
                  value.length > 0 &&
                  profiles &&
                  value !== 'MYSELF' && (
                    <FlatList
                      data={profiles}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.idpKey}
                    />
                  )}
              </SafeAreaView>
              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: Dimensions.get('window').width * 0.05,
                  flexGrow: 1,
                  justifyContent: 'flex-end',
                }}
              >
                <TouchableOpacity
                  style={style.button}
                  onPress={() => handleStart()}
                >
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 14,
                      fontWeight: 'bold',
                      lineHeight: 24,
                      letterSpacing: 0.1,
                    }}
                  >
                    Start
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: colors.sherpaBlue,
                  fontSize: 14,
                  lineHeight: 14,
                  letterSpacing: 1.5,
                  fontWeight: 'bold',
                }}
              >
                ROCZEN
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  screen: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.sherpaBlue,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  card: {
    backgroundColor: colors.aeroBlue,
    height:
      Dimensions.get('window').width < 350
        ? Dimensions.get('window').height * 0.8
        : Dimensions.get('window').height * 0.6,
    width: Dimensions.get('window').width * 0.8,
    borderWidth: 1,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderColor: colors.aeroBlue,
    alignItems: 'center',
    paddingVertical: Dimensions.get('window').width * 0.1,
  },
  cardTitle: {
    color: colors.persianGreen,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 14,
    letterSpacing: 1.5,
  },
  carQuestion: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
    letterSpacing: 0.15,
    marginTop: Dimensions.get('window').width * 0.1,
  },
  formControl: {
    width: '100%',
    marginTop: Dimensions.get('window').width * 0.05,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    position: 'relative',
    zIndex: 99,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.eggBlue,
    height: Dimensions.get('window').height * 0.04,
    width: '90%',
  },
  radioButtonWrapper: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 12,
  },
});

export default ImpersonationScreen;
