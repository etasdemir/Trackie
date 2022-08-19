import {NativeModules, Platform} from 'react-native';

import {resolveLanguage} from './languageResolver';
import {store} from '../../redux/AppStore';
import {LANGUAGE} from 'src/shared/Constant';

class Language {
  getText(key: string, ...params: String[]): string {
    const lang = store.getState().user.language;
    const text = resolveLanguage(lang, key);
    if (text instanceof Function) {
      if (params && params.length > 0) {
        return text(params);
      } else {
        console.error(
          'Language text is a function but called without parameters',
        );
        return 'Error';
      }
    } else {
      return text.toString();
    }
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

export default new Language();
