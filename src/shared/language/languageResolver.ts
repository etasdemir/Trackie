import {StringToLang} from 'src/shared/Types';
import {en} from './en';
import {tr} from './tr';

interface StringToObject {
  [key: string]: StringToLang;
}

const abbrToObj: StringToObject = {
  en: en,
  tr: tr,
};

export const resolveLanguage = (abbr: string, key: string) => {
  return abbrToObj[abbr][key];
};
