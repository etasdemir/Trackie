import {createReducer} from '@reduxjs/toolkit';

import {
  setIsFirstInstallAction,
  setLanguageAction,
  setThemeAction,
} from '../actions/UserActions';
import Repository from 'src/data/Repository';
import {UserState} from '../ReduxTypes';
import defaultTheme, {themeJson, themeStore} from 'src/shared/theme';
import {default as Language} from 'src/shared/language';

const initialState: UserState = {
  language: Language.getDefaultLanguage(),
  theme: {...defaultTheme, theme: themeStore.defaultTheme},
  reading_count: 0,
  finished_count: 0,
  fav_manga_count: 0,
  is_first_install: true,
};

export const userReducer = createReducer(initialState, builder => {
  builder.addCase(setThemeAction, (state, action) => {
    const {theme} = action.payload;
    Repository.setTheme(theme);
    state.theme = {...themeJson[theme], theme};
  });
  builder.addCase(setLanguageAction, (state, action) => {
    const {language} = action.payload;
    Repository.setLanguage(language);
    state.language = language;
  });
  builder.addCase(setIsFirstInstallAction, (state, action) => {
    const value = action.payload;
    Repository.setIsFirstInstall(value);
    state.is_first_install = value;
  });
});
