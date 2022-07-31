import {createAction} from '@reduxjs/toolkit';

import MangaService from 'src/api/remote/service/MangaService';
import {AppDispatch} from 'src/redux/AppStore';
import {ActionMap, MangaState} from '../ReduxTypes';

function withPayloadType<T>() {
  return (t: T) => ({payload: t});
}

export const getMangaAction = createAction(
  'GET_MANGA_BY_ID',
  withPayloadType<ActionMap<MangaState['mangas'][0]>>(),
);

export const getMangaThunk = (mangaId: number) => {
  return async (dispatch: AppDispatch) => {
    const manga = await MangaService.getMangaById(mangaId);
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
    const characters = await MangaService.getMangaCharacters(mangaId);
    dispatch(
      getMangaCharactersAction({
        id: mangaId,
        value: characters,
      }),
    );
  };
};
