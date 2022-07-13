import {resolveLanguage} from './languageResolver';

class Language {
  language = 'en';

  getText(key: string, ...params: String[]): String {
    const text = resolveLanguage(this.language, key);
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
      return text;
    }
  }

  setLanguage(newLang: string) {
    this.language = newLang;
  }
}

export default new Language();
