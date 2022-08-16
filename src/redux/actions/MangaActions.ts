import {createAction} from '@reduxjs/toolkit';

import {AppDispatch} from 'src/redux/AppStore';
import {ActionMap, MangaState} from '../ReduxTypes';
import Repository from 'src/data/Repository';

function withPayloadType<T>() {
  return (t: T) => ({payload: t});
}

export const getMangaAction = createAction(
  'GET_MANGA_BY_ID',
  withPayloadType<ActionMap<MangaState['mangas'][0]>>(),
);

export const getMangaThunk = (mangaId: number) => {
  return async (dispatch: AppDispatch) => {
    const manga = await Repository.getMangaById(mangaId);
    if (manga === undefined) {
      console.error(`manga with id: ${mangaId} return undefined.`);
    } else {
      dispatch(
        getMangaAction({
          id: mangaId,
          value: manga,
        }),
      );
    }
  };
};

export const getMangaCharactersAction = createAction(
  'GET_MANGA_CHARACTERS',
  withPayloadType<ActionMap<MangaState['mangaCharacters'][0]>>(),
);

export const getMangaCharactersThunk = (mangaId: number) => {
  return async (dispatch: AppDispatch) => {
    const characters = await Repository.getMangaCharacters(mangaId);
    dispatch(
      getMangaCharactersAction({
        id: mangaId,
        value: characters,
      }),
    );
  };
};

export const searchMangaAction = createAction(
  'SEARCH_MANGA',
  withPayloadType<MangaState['searchManga']>(),
);

export const searchMangaThunk = (query: string, page: number) => {
  return async (dispatch: AppDispatch) => {
    const searchResult = await Repository.searchManga(query, page);
    dispatch(searchMangaAction(searchResult));
  };
};
