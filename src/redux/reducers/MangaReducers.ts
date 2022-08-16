import {createReducer} from '@reduxjs/toolkit';

import {
  getMangaAction,
  getMangaCharactersAction,
  searchMangaAction,
  setFavouriteMangaAction,
} from '../actions/MangaActions';
import {MangaState} from '../ReduxTypes';
import Repository from 'src/data/Repository';
import {FAVOURITE_TYPE} from 'src/shared/Constant';

const initialState: MangaState = {
  mangas: {},
  mangaCharacters: {},
  searchManga: [],
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
  builder.addCase(searchMangaAction, (state, action) => {
    const mangaList = action.payload;
    state.searchManga = mangaList;
  });
  builder.addCase(setFavouriteMangaAction, (state, action) => {
    const {id, isFavourite} = action.payload;
    Repository.setFavourite(FAVOURITE_TYPE.MANGA, id, isFavourite);
    if (state.mangas[id]) {
      state.mangas[id].is_favourite = isFavourite;
    }
  });
});
