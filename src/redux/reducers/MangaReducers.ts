import {createReducer} from '@reduxjs/toolkit';

import {
  getMangaAction,
  getMangaCharactersAction,
  searchMangaAction,
} from '../actions/MangaActions';
import {MangaState} from '../ReduxTypes';

const initialState: MangaState = {
  mangas: {},
  mangaCharacters: {},
  searchManga: [],
};

export const mangaReducer = createReducer(initialState, builder => {
  builder.addCase(getMangaAction, (state, action) => {
    const {id, value} = action.payload;
    state.mangas[id] = value;
  });
  builder.addCase(getMangaCharactersAction, (state, action) => {
    const {id, value} = action.payload;
    state.mangaCharacters[id] = value;
  });
  builder.addCase(searchMangaAction, (state, action) => {
    const mangaList = action.payload;
    state.searchManga = mangaList;
  });
});
