import { AppRegistry } from 'react-native';
import {
  en,
  enGB,
  nl,
  pl,
  registerTranslation,
} from 'react-native-paper-dates';
import 'react-native-gesture-handler';
registerTranslation('en', en);
registerTranslation('en-GB', enGB);
registerTranslation('nl', nl);
registerTranslation('pl', pl);
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
