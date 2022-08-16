import {createReducer} from '@reduxjs/toolkit';

import {setIsFirstInstallAction, setThemeAction} from '../actions/UserActions';
import Repository from 'src/data/Repository';
import {UserState} from '../ReduxTypes';
import defaultTheme, {themeJson, themeStore} from 'src/shared/theme';

const initialState: UserState = {
  language: '',
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
  builder.addCase(setIsFirstInstallAction, (state, action) => {
    const value = action.payload;
    Repository.setIsFirstInstall(value);
    state.is_first_install = value;
  });
});
