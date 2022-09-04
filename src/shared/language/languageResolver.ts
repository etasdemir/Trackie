import LanguageInterface from './languageInterface';
import {LANGUAGE} from 'src/shared/Constant';
import {en} from './en';
import {tr} from './tr';

interface StringToObject {
  [key: string]: LanguageInterface;
}

const languageJson: StringToObject = {
  [LANGUAGE.ENGLISH]: en,
  [LANGUAGE.TURKISH]: tr,
};

export default languageJson;
