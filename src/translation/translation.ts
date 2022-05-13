import { NativeModules, Platform } from 'react-native';
import { createTranslations } from 'react-ridge-translations';

type TranslationLanguages = {
  en: string;
  nl: string;
};

const deviceLanguage =
  (Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier) || '';
const availableLanguages: (keyof TranslationLanguages)[] = ['en', 'nl'];
const fallback = 'en';

function getBestLanguage():
  | typeof availableLanguages[number]
  | typeof fallback {
  return (
    availableLanguages.find((al) => deviceLanguage.startsWith(al)) || fallback
  );
}
const DONT_HAVE_TEXT = "Sorry we don't have this text on this language";
const translate = createTranslations<TranslationLanguages>()(
  {
    WelcomeScreen: {
      clinicianName: {
        en: 'Reset Health',
        nl: 'Dutch',
      },
      description: ({ beTranslate }: { beTranslate: string | undefined }) => ({
        nl: `${beTranslate ? beTranslate : DONT_HAVE_TEXT}`,
        en: `${beTranslate ? beTranslate : DONT_HAVE_TEXT}`,
      }),
    },
    Generator: {
      question: ({ question }: { question: string | undefined }) => ({
        en: `${question ? question : 'Server is not providing this language.'}`,
        nl: `${question ? question : 'Server is not providing this language.'}`,
      }),
    },
    TextField: {
      label: ({ label }: { label: string | undefined }) => ({
        en: `${label ? label : DONT_HAVE_TEXT}`,
        nl: `${label ? label : DONT_HAVE_TEXT}`,
      }),
      placeHolder: ({ placeHolder }: { placeHolder: string | undefined }) => ({
        en: `${placeHolder ? placeHolder : ''}`,
        nl: `${placeHolder ? placeHolder : ''}`,
      }),
    },
    ManualAddress: {
      address1Label: ({ address1 }: { address1: string | undefined }) => ({
        en: `${address1 ? address1 : DONT_HAVE_TEXT}`,
        nl: `${address1 ? address1 : DONT_HAVE_TEXT}`,
      }),
      address1Placeholder: ({
        address1,
      }: {
        address1: string | undefined;
      }) => ({
        en: `${address1 ? address1 : ''}`,
        nl: `${address1 ? address1 : ''}`,
      }),
      address2Label: ({ address2 }: { address2: string | undefined }) => ({
        en: `${address2 ? address2 : DONT_HAVE_TEXT}`,
        nl: `${address2 ? address2 : DONT_HAVE_TEXT}`,
      }),
      address2Placeholder: ({
        address2,
      }: {
        address2: string | undefined;
      }) => ({
        en: `${address2 ? address2 : ''}`,
        nl: `${address2 ? address2 : ''}`,
      }),
      cityLabel: ({ city }: { city: string | undefined }) => ({
        en: `${city ? city : DONT_HAVE_TEXT}`,
        nl: `${city ? city : DONT_HAVE_TEXT}`,
      }),
      cityPlaceholder: ({ city }: { city: string | undefined }) => ({
        en: `${city ? city : ''}`,
        nl: `${city ? city : ''}`,
      }),
      postcodeLabel: ({ postcode }: { postcode: string | undefined }) => ({
        en: `${postcode ? postcode : DONT_HAVE_TEXT}`,
        nl: `${postcode ? postcode : DONT_HAVE_TEXT}`,
      }),
      postcodePlaceholder: ({
        postcode,
      }: {
        postcode: string | undefined;
      }) => ({
        en: `${postcode ? postcode : ''}`,
        nl: `${postcode ? postcode : ''}`,
      }),
    },
  },
  {
    language: getBestLanguage(),
    fallback,
  }
);
export default translate;
