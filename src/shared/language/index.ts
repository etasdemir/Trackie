import {NativeModules, Platform} from 'react-native';

import languageJson from './languageResolver';
import {LANGUAGE} from 'src/shared/Constant';

class Language {
  defaultLanguage = LANGUAGE.ENGLISH;

  constructor() {
    this.defaultLanguage = this.getDefaultLanguage();
  }

  getDefaultLanguage(): string {
    let locale: string;
    if (Platform.OS === 'ios') {
      locale =
        NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0];
    } else {
      locale = NativeModules.I18nManager.localeIdentifier;
    }
    locale = locale.split('_')[0];
    locale = locale.split('-')[0];
    if (locale) {
      return locale;
    } else {
      return LANGUAGE.ENGLISH;
    }
  }
}

const languageStore = new Language();
export default languageJson[languageStore.defaultLanguage];
export {languageStore, languageJson};
