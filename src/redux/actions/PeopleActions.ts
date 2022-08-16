import {createAction} from '@reduxjs/toolkit';

import {AppDispatch} from '../AppStore';
import {ActionMap, PeopleState} from '../ReduxTypes';
import Repository from 'src/data/Repository';

function withPayloadType<T>() {
  return (t: T) => ({payload: t});
}

export const getCharacterAction = createAction(
  'GET_CHARACTER_ACTION',
  withPayloadType<ActionMap<PeopleState['characters'][0]>>(),
);

export const getCharacterThunk = (characterId: number) => {
  return async (dispatch: AppDispatch) => {
    const character = await Repository.getCharacterDetailById(characterId);
    if (!character) {
      console.error(`character with id ${characterId} returned undefined.`);
    } else {
      dispatch(
        getCharacterAction({
          id: characterId,
          value: character,
        }),
      );
    }
  };
};

export const getAuthorAction = createAction(
  'GET_AUTHOR_ACTION',
  withPayloadType<ActionMap<PeopleState['authors'][0]>>(),
);

export const getAuthorThunk = (authorId: number) => {
  return async (dispatch: AppDispatch) => {
    const author = await Repository.getAuthorDetailById(authorId);
    if (!author) {
      console.error(`author with id ${authorId} returned undefined.`);
    } else {
      dispatch(
        getAuthorAction({
          id: authorId,
          value: author,
        }),
      );
    }
  };
};
