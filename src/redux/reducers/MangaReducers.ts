import {createReducer} from '@reduxjs/toolkit';

import {
  getMangaAction,
  getMangaCharactersAction,
} from '../actions/MangaActions';
import {MangaState} from '../ReduxTypes';

const initialState: MangaState = {
  mangas: {},
  mangaCharacters: {},
};

export const mangaReducer = createReducer(initialState, builder => {
  builder.addCase(getMangaAction, (state, action) => {
    const {id, value} = action.payload;
    if (!state.mangas[id]) {
      state.mangas[id] = value;
    }
  });
  builder.addCase(getMangaCharactersAction, (state, action) => {
    const {id, value} = action.payload;
    if (!state.mangaCharacters[id]) {
      state.mangaCharacters[id] = value;
    }
  });
});
