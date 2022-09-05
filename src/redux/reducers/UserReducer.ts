import {createReducer} from '@reduxjs/toolkit';

import {
  updateFavouritesAction,
  setIsFirstInstallAction,
  setLanguageAction,
  setThemeAction,
  setUserAction,
  addSearchRecentAction,
  removeSearchRecentAction,
  deleteAllSearchRecentAction,
  updateReadingStatusAction,
  removeReadingStatusAction,
  deleteAllData,
} from '../actions/UserActions';
import Repository from 'src/data/Repository';
import {UserState} from '../ReduxTypes';
import defaultTheme, {themeJson} from 'src/shared/theme';
import defaultLanguage, {
  languageJson,
  languageStore,
} from 'src/shared/language';
import {FAVOURITE_TYPE} from 'src/shared/Constant';
import {readingStatusesSort} from 'src/data/local/dao/UserDao';

const initialState: UserState = {
  user: {
    theme: defaultTheme,
    persisted_theme: {theme: defaultTheme.theme, isDeviceTheme: true},
    language: defaultLanguage,
    persisted_language: {
      language: languageStore.defaultLanguage,
      isDeviceLanguage: true,
    },
    is_first_install: true,
    modify_date: 0,
    reading_statuses: [],
    favourite_mangas: [],
    favourite_authors: [],
    favourite_characters: [],
    search_recent: [],
  },
};

export const userReducer = createReducer(initialState.user, builder => {
  builder.addCase(setUserAction, (state, action) => {
    const {user} = action.payload;

    let theme = state.theme;
    let persistedTheme = state.persisted_theme;
    if (!user.persisted_theme.isDeviceTheme) {
      theme = themeJson[user.persisted_theme.theme];
      persistedTheme = user.persisted_theme;
    }

    let language = state.language;
    let persistedLanguage = state.persisted_language;
    if (!user.persisted_language.isDeviceLanguage) {
      persistedLanguage = user.persisted_language;
      language = languageJson[persistedLanguage.language];
    }

    state = Object.assign(user, {
      theme,
      persisted_theme: persistedTheme,
      language,
      persisted_language: persistedLanguage,
      search_recent: user.search_recent.slice(),
      reading_statuses: readingStatusesSort(user.reading_statuses.slice()),
    });
    return state;
  });
  builder.addCase(setThemeAction, (state, action) => {
    const newPersistedState = action.payload;
    Repository.setTheme(newPersistedState);
    state.theme = themeJson[newPersistedState.theme];
    state.persisted_theme = newPersistedState;
  });
  builder.addCase(setLanguageAction, (state, action) => {
    const newPersistedLanguage = action.payload;
    Repository.setLanguage(newPersistedLanguage);
    state.language = languageJson[newPersistedLanguage.language];
    state.persisted_language = newPersistedLanguage;
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
  builder.addCase(addSearchRecentAction, (state, action) => {
    const payload = action.payload;
    Repository.addSearchRecent(payload);
    state.search_recent.push(payload);
  });
  builder.addCase(removeSearchRecentAction, (state, action) => {
    const payload = action.payload;
    Repository.removeSearchRecent(payload);
    state.search_recent = state.search_recent.filter(
      element =>
        element !== payload &&
        element.searched_item_id !== payload.searched_item_id,
    );
  });
  builder.addCase(deleteAllSearchRecentAction, (state, _) => {
    Repository.deleteAllSearchRecent();
    state.search_recent = [];
  });
  builder.addCase(updateReadingStatusAction, (state, action) => {
    const readingStatus = action.payload;
    Repository.updateReadingStatus(readingStatus);
    let isExists = false;
    state.reading_statuses.forEach((element, index) => {
      if (element.mangaId === readingStatus.mangaId) {
        state.reading_statuses[index] = readingStatus;
        isExists = true;
        return;
      }
    });
    if (!isExists) {
      state.reading_statuses.push(readingStatus);
    }
    state.reading_statuses = readingStatusesSort(state.reading_statuses);
  });
  builder.addCase(removeReadingStatusAction, (state, action) => {
    const readingStatus = action.payload;
    Repository.removeFromReadings(readingStatus);
    state.reading_statuses = state.reading_statuses.filter(element => {
      element.mangaId !== readingStatus.mangaId;
    });
  });
  builder.addCase(deleteAllData, () => {
    Repository.clearData();
    return initialState.user;
  });
});
