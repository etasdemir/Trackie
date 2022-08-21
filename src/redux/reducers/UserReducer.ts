import {createReducer} from '@reduxjs/toolkit';

import {
  updateFavouritesAction,
  setIsFirstInstallAction,
  setLanguageAction,
  setThemeAction,
  setUserAction,
} from '../actions/UserActions';
import Repository from 'src/data/Repository';
import {UserState} from '../ReduxTypes';
import defaultTheme, {themeJson} from 'src/shared/theme';
import {default as Language} from 'src/shared/language';
import {FAVOURITE_TYPE} from 'src/shared/Constant';

const initialState: UserState = {
  user: {
    theme: defaultTheme,
    language: Language.getDefaultLanguage(),
    is_first_install: true,
    modify_date: 0,
    reading_statuses: [],
    favourite_mangas: [],
    favourite_authors: [],
    favourite_characters: [],
  },
};

export const userReducer = createReducer(initialState.user, builder => {
  builder.addCase(setUserAction, (state, action) => {
    const {user} = action.payload;
    state = Object.assign(user, {
      theme: state.theme,
      language: user.language ?? state.language,
    });
    return state;
  });
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
  builder.addCase(updateFavouritesAction, (state, action) => {
    const {type, values} = action.payload;
    switch (type) {
      case FAVOURITE_TYPE.MANGA: {
        state.favourite_mangas =
          values as UserState['user']['favourite_mangas'];
        break;
      }
      case FAVOURITE_TYPE.AUTHOR: {
        state.favourite_authors =
          values as UserState['user']['favourite_authors'];
        break;
      }
      case FAVOURITE_TYPE.CHARACTER: {
        state.favourite_characters =
          values as UserState['user']['favourite_characters'];
        break;
      }
    }
  });
});
