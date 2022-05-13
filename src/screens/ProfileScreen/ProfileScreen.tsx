import React, { FC, useState, useCallback, useEffect } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import {
  FooterWithCTA,
  InputField,
  DatePicker,
  RadioGroup,
  Address1,
  DialogBox,
} from '../../components';
import { colors } from '../../config/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RHPfetch, RHPResponse } from '../../config/apiWrapper';
import {
  ProfileState,
  UserInfoState,
  NavigationState,
  QuestionSetInfoState,
} from '../../store/models';
import { RootState } from '../../store/reducers/rootReducer';
import { REACT_APP_PROFILE_API } from '@env';
import { updateNavigationInformation } from '../../store/actions/navigation/navigation';
import { updateQuestionSetInformation } from '../../store/actions';

const childrens = [
  {
    id: '1',
    accessibilityDescription: null,
    defaultSelected: false,
    labelText: {
      en: 'Male',
    },
    value: 'MALE',
    question: null,
  },
  {
    id: '2',
    accessibilityDescription: null,
    defaultSelected: false,
    labelText: {
      en: 'Female',
    },
    value: 'FEMALE',
    question: null,
  },
];

const addresses: any = {
  addressline1: {
    labelText: {
      en: 'Address Line 1',
    },
    placeholder: {
      en: 'Address Line 1',
    },
    required: false,
    validate: {
      minLength: 2,
    },
  },
  addressline2: {
    labelText: {
      en: 'Address Line 2 (optional)',
    },
    placeholder: {
      en: 'Address Line 2 (optional)',
    },
    required: false,
    validate: {},
  },
  city: {
    labelText: {
      en: 'City',
    },
    placeholder: {
      en: 'City',
    },
    required: false,
    validate: {
      minLength: 2,
    },
  },
  postcode: {
    labelText: {
      en: 'Postcode',
    },
    placeholder: {
      en: 'Postcode',
    },
    required: false,
    validate: {
      minLength: 4,
    },
  },
};

const ProfileScreen: FC<any> = ({ navigation }) => {
  const [userCode, setUserCode] = useState<any>({
    value: '',
    valid: true,
  });
  const { phoneNumber, subId } = useSelector(
    (state: RootState) => state.user
  ) as UserInfoState;
  const { profile } = useSelector(
    (state: RootState) => state.profile
  ) as ProfileState;
  const { hint, hintStatus } = useSelector(
    (state: RootState) => state.questionSetInfo
  ) as QuestionSetInfoState;
  const { navigationId } = useSelector(
    (state: RootState) => state.navigation
  ) as NavigationState;
  const [userId, setUserId] = useState<any>(profile?.body.id);
  const initialStep: number =
    profile?.status === 418 || profile?.status === 502 ? 5 : 0;
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  console.log(
    'Starting at step: ',
    initialStep,
    currentStep,
    'with profile: ',
    profile
  );

  const [profileStatus, setProfile] = useState<any>({
    givenName: '',
    familyName: '',
    knownAs: null,
    dateOfBirth: '',
    nameLayout: 'WESTERN',
    profileType: 'MEMBER',
    sexAtBirth: '',
    personalEmail: '',
    homeAddress: {
      addressline1: '',
      addressline2: null,
      city: '',
      postcode: '',
    },
    personalPhone: '',
    idpKey: '',
    isValid: false,
  });

  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    setProfile((prevState: any) => {
      return {
        ...prevState,
        personalPhone: phoneNumber,
        idpKey: subId,
      };
    });
  }, [phoneNumber, subId]);

  useEffect(() => {
    if (profile.status === 200 && !profile?.body.emailVerifiedAt)
      setCurrentStep(5);
    else {
      console.log('NAVIGATION-ID:', navigationId);
      if (navigationId) {
        console.log('Navigating to ', navigationId);
        navigation.navigate(navigationId);
      }
      if (profile?.status === 200) {
        // navigation.navigate('Impersonation') // FIXME: Impersonation disabled
        console.log(
          'User information updated: ',
          profile,
          'Navigating to Hompage'
        );
        dispatch(updateNavigationInformation({ navigationId: 'Homepage' }));
        navigation.reset({ index: 0, routes: [{ name: 'Homepage' }] });
      }
    }
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, dispatch, navigation]);

  useEffect(() => {
    let isMounted = true;
    if (currentStep !== null && currentStep !== undefined)
      if (currentStep === 1)
        dispatch(
          updateQuestionSetInformation({
            hint: {
              title: { en: 'Why do we need this information?' },
              body: {
                en: `We need your date of birth to confirm that you are at least 18 years of age. \n
Treatment plans and advice are also based on your age so it is crucial we have this information so that we can provide any clinical care.
                        `,
              },
            },
            questionIndex: 0,
          })
        );
      else if (currentStep === 5)
        dispatch(
          updateQuestionSetInformation({
            hint: {
              title: { en: 'Get help' },
              body: {
                en: `If you're having trouble finding our email, please check your junk mail. \n
If you require further support please email help@roczen.com
                        `,
              },
            },
            questionIndex: 0,
          })
        );
      else
        dispatch(
          updateQuestionSetInformation({
            hint: {
              title: { en: '' },
              body: {
                en: '',
              },
            },
            questionIndex: 0,
          })
        );
    return () => {
      isMounted = false;
    };
  }, [currentStep, dispatch]);

  const handlePreviousQuestion = () => {
    setCurrentStep((prevState) => prevState - 1);
  };

  const submitEmailVerification = (id: string) => {
    console.log('--> Getting profile: ', id);
    const res = RHPfetch(`${REACT_APP_PROFILE_API}/profile/${id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    });

    return res;
  };

  const submitEmailVerificationCode = async () => {
    const result: any | null = await RHPfetch(
      `${REACT_APP_PROFILE_API}/profile/${userId}/verifyemail`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: JSON.stringify({ code: userCode.value.value }),
      }
    )
      .then((res: any) => {
        return RHPResponse(res);
      })
      .then((res: any) => {
        console.log('User ID: (result) ', res, res?.body?.id);
        // dispatch(
        //     fetchProfileById({
        //         userId: res?.body?.id,
        //         impersonate: false
        //     })
        // );
        return res;
      })
      .catch((err: any) => {
        console.log('Error submitting code: ', err);
        setUserCode({
          value: userCode.value,
          valid: false,
        });
        return null;
      });
    console.log('zzz', result);
    if (result?.status === 200 && result.body.id) {
      dispatch(updateNavigationInformation({ navigationId: 'Profile Done' }));
      navigation.navigate('Profile Done', { userId: result });
    } else if (result?.status !== 200)
      setUserCode({
        value: userCode.value,
        valid: false,
      });
  };

  const submitProfile = async (data: any): Promise<boolean> => {
    const res = await RHPfetch(`${REACT_APP_PROFILE_API}/profile`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify(data),
    })
      .then((res: any) => {
        return RHPResponse(res);
      })
      .then((result: any) => {
        console.log('Profile created. Setting user ID to: ', result?.body?.id);
        setUserId(result?.body?.id);
        return true;
      })
      .catch((error: any) => {
        console.log('Profile creation error: ', error);
        return false;
      });

    return res;
  };

  const handleNextQuestion = async () => {
    if (currentStep === 4) {
      let res: boolean = false;
      let finalProfile = { ...profileStatus };

      finalProfile.homeAddress.countryCode = 'GB';
      finalProfile.homeAddress.state = null;
      finalProfile.homeAddress.addressLine1 =
        finalProfile.homeAddress.addressline1;
      finalProfile.homeAddress.addressLine2 = finalProfile.homeAddress
        .addressline2
        ? finalProfile.homeAddress.addressline2
        : null;
      finalProfile.personalPhone = phoneNumber;
      finalProfile.knownAs = finalProfile.knownAs ? finalProfile.knownAs : null;
      delete finalProfile.homeAddress.addressline1;
      delete finalProfile.homeAddress.addressline2;
      delete finalProfile.isValid;

      if (!profile || profile?.status === 404) {
        res = await submitProfile(finalProfile);
        console.log('Result of profile creation: ', res);
        if (!res) {
          setCurrentStep((prevState) => prevState - 1);
        }
      } else {
        await submitEmailVerification(profile?.body?.id);
      }
    }

    if (currentStep + 1 === 6) {
      await submitEmailVerificationCode();
    }

    if (currentStep + 1 !== 6) setCurrentStep((prevState) => prevState + 1);
  };

  const checkValidity = () => {
    let valid = true;

    if (
      profileStatus.givenName &&
      profileStatus.givenName.length >= 2 &&
      profileStatus.givenName.length <= 50 &&
      profileStatus.familyName &&
      profileStatus.familyName.length >= 2 &&
      profileStatus.familyName.length <= 50 &&
      currentStep === 0 &&
      profileStatus.isValid
    ) {
      if (profileStatus.knownAs.length === 0) valid = false;
      if (profileStatus.knownAs.length >= 2) valid = false;
    }
    if (profileStatus.dateOfBirth && currentStep === 1 && profileStatus.isValid)
      valid = false;
    if (profileStatus.sexAtBirth && currentStep === 2) valid = false;
    if (
      currentStep === 3 &&
      profileStatus.homeAddress.addressline1.length >= 2 &&
      profileStatus.homeAddress.city.length >= 2 &&
      profileStatus.homeAddress.postcode.length >= 4
    )
      valid = false;
    if (
      profileStatus.personalEmail &&
      profileStatus.isValid &&
      currentStep === 4
    )
      valid = false;
    if (currentStep === 5) valid = false;

    return valid;
  };

  const onChangeHandler = (value: any, isValid: boolean, id: string) => {
    setProfile((prevState: any) => {
      return {
        ...prevState,
        isValid: isValid,
        [id]: value.value.trim(),
      };
    });
  };

  const onChangeHandler2 = (value: any, isValid: boolean, id: string) => {
    setProfile((prevState: any) => {
      return {
        ...prevState,
        homeAddress: {
          addressline1: value.addressline1.trim(),
          addressline2: value.addressline2.trim(),
          city: value.city.trim(),
          postcode: value.postcode.trim(),
        },
      };
    });
  };

  const Step0 = useCallback(() => {
    if (currentStep !== 0) return null;
    return (
      <View style={{ margin: 24 }}>
        <Text style={styles.title}>Welcome to Roczen. What's your name?</Text>
        <View style={{ marginTop: 24 }}>
          <View style={{ marginBottom: 24 }}>
            <InputField
              id={'givenName'}
              disabled={false}
              multiline={false}
              subType={'TEXT'}
              labelText={{ en: 'First name' }}
              validate={{
                minLength: 2,
                maxLength: 50,
                maxValue: undefined,
                minValue: undefined,
                regex: undefined,
              }}
              required={true}
              inputChangeHandler={onChangeHandler}
              errorText="First name must be at least 2 characters"
              initialValue={{ value: profileStatus.givenName }}
              initiallyValid={true}
              isOrgCode={false}
            />
          </View>
          <View style={{ marginBottom: 24 }}>
            <InputField
              id={'familyName'}
              disabled={false}
              multiline={false}
              subType={'TEXT'}
              labelText={{ en: 'Last name' }}
              validate={{
                minLength: 2,
                maxLength: 50,
                maxValue: undefined,
                minValue: undefined,
                regex: undefined,
              }}
              required={true}
              inputChangeHandler={onChangeHandler}
              errorText="Last name must be at least 2 characters"
              initialValue={{ value: profileStatus.familyName }}
              initiallyValid={true}
              isOrgCode={false}
            />
          </View>
          <InputField
            id={'knownAs'}
            disabled={false}
            multiline={false}
            subType={'TEXT'}
            labelText={{ en: 'Preferred name (optional)' }}
            validate={{
              minLength: 2,
              maxLength: 50,
              maxValue: undefined,
              minValue: undefined,
              regex: undefined,
            }}
            required={false}
            inputChangeHandler={onChangeHandler}
            errorText="Preferred name must be at least 2 characters"
            initialValue={{ value: profileStatus.knownAs }}
            initiallyValid={true}
            isOrgCode={false}
          />
        </View>
      </View>
    );
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const Step1 = useCallback(() => {
    if (currentStep !== 1) return null;
    return (
      <View style={{ margin: 24 }}>
        <Text style={styles.title}>When is your date of birth?</Text>
        <View style={{ marginTop: 24 }}>
          <DatePicker
            id={'dateOfBirth'}
            disabled={false}
            required={true}
            mode={'DATE_SINGLE_PICK'}
            inputChangeHandler={onChangeHandler}
            initialValue={{ value: profileStatus.dateOfBirth }}
            initiallyValid={true}
            validate={{
              minDate: new Date().setFullYear(new Date().getFullYear() - 100),
              maxDate: new Date().setFullYear(new Date().getFullYear() - 18),
              maxDateExceededError: 'You must be at least 18 years old',
              minDateExceededError: 'You must be under 100 years old',
            }}
          />
        </View>
      </View>
    );
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const Step2 = useCallback(() => {
    if (currentStep !== 2) return null;
    return (
      <View style={{ margin: 24 }}>
        <Text style={styles.title}>What was your sex at birth?</Text>
        <View style={{ marginTop: '15%' }}>
          <RadioGroup
            id={'sexAtBirth'}
            disabled={false}
            children={childrens}
            horizontal={false}
            required={true}
            inputChangeHandler={onChangeHandler}
            initialValue={{ value: profileStatus.sexAtBirth }}
            initiallyValid={true}
          />
        </View>
      </View>
    );
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const Step3 = useCallback(() => {
    if (currentStep !== 3) return null;
    return (
      <View style={{ margin: 24 }}>
        <Text style={styles.title}>What is your home address?</Text>
        <View style={{ marginTop: '10%' }}>
          <Address1
            id={'address1'}
            disabled={false}
            config={addresses}
            required={true}
            inputChangeHandler={onChangeHandler2}
            initialValue={profileStatus.homeAddress}
            initiallyValid={true}
          />
        </View>
      </View>
    );
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const Step4 = useCallback(() => {
    if (currentStep !== 4) return null;
    return (
      <View style={{ margin: 24 }}>
        <Text style={styles.title}>What is your personal email address?</Text>
        <View style={{ marginTop: 24 }}>
          <View style={{ marginBottom: 24 }}>
            <InputField
              id={'personalEmail'}
              disabled={false}
              multiline={false}
              subType={'TEXT'}
              labelText={{ en: 'Email address' }}
              validate={{
                minLength: undefined,
                maxLength: undefined,
                maxValue: undefined,
                minValue: undefined,
                regex:
                  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])$/,
              }}
              required={true}
              inputChangeHandler={onChangeHandler}
              errorText="Please enter a valid email address"
              initialValue={{ value: profileStatus.personalEmail }}
              initiallyValid={true}
              isOrgCode={false}
            />
          </View>
        </View>
      </View>
    );
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const Step5 = useCallback(() => {
    if (currentStep !== 5) return null;
    return (
      <View style={{ margin: 24 }}>
        <Text style={styles.title}>Verify email address</Text>
        <Text style={styles.subTitle}>
          We’ve sent a one-time passcode to your email address
        </Text>
        <View style={{ marginTop: 24 }}>
          <View style={{ marginBottom: 24 }}>
            <InputField
              id={'verificationCode'}
              disabled={false}
              multiline={false}
              subType={'TEXT'}
              labelText={{ en: 'Passcode' }}
              validate={{
                minLength: undefined,
                maxLength: 4,
                maxValue: undefined,
                minValue: undefined,
                regex: undefined,
              }}
              required={true}
              inputChangeHandler={(value: any, isValid: boolean, id: string) =>
                setUserCode({ value: value, valid: true })
              }
              errorText="Passcode invalid. Please try again."
              initialValue={{ value: userCode.value.value }}
              initiallyValid={userCode.valid}
              isOrgCode={false}
            />
          </View>
        </View>
      </View>
    );
    // TODO: improve
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, userCode.valid]);

  console.log('Rendering step: ', currentStep);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={headerHeight}
    >
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
      <SafeAreaView
        style={{
          flexDirection: 'column',
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Step0 />
              <Step1 />
              <Step2 />
              <Step3 />
              <Step4 />
              <Step5 />
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
        {currentStep <= 5 ? (
          <View
            style={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              paddingHorizontal: 15,
            }}
          >
            <FooterWithCTA
              secondaryCTA={{
                label: 'Back',
                onPress: handlePreviousQuestion,
                mode: 'outlined',
                style: { backgroundColor: colors.white },
                show: currentStep !== 0,
              }}
              primaryCTA={{
                label: 'Next',
                mode: 'contained',
                onPress: handleNextQuestion,
                labelStyle: {
                  color: checkValidity() ? colors.gray : colors.white,
                },
                show: true,
                disabled: checkValidity(),
              }}
            />
          </View>
        ) : null}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 5,
  },
  title: {
    fontSize: 24,
    lineHeight: 24,
    color: colors.black,
    letterSpacing: 0.18,
  },
  subTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
    letterSpacing: 0.5,
    marginTop: 15,
  },
});

export default ProfileScreen;
