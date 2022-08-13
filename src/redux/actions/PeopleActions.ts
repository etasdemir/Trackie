import {createAction} from '@reduxjs/toolkit';

import PeopleService from 'src/data/remote/service/PeopleService';
import {AppDispatch} from '../AppStore';
import {ActionMap, PeopleState} from '../ReduxTypes';

function withPayloadType<T>() {
  return (t: T) => ({payload: t});
}

export const getCharacterAction = createAction(
  'GET_CHARACTER_ACTION',
  withPayloadType<ActionMap<PeopleState['characters'][0]>>(),
);

export const getCharacterThunk = (characterId: number) => {
  return async (dispatch: AppDispatch) => {
    const character = await PeopleService.getCharacterById(characterId);
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
    const author = await PeopleService.getAuthorById(authorId);
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
