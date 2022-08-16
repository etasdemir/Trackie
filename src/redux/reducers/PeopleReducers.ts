import {createReducer} from '@reduxjs/toolkit';

import {PeopleState} from '../ReduxTypes';
import {
  getAuthorAction,
  getCharacterAction,
  setFavouriteAuthorAction,
  setFavouriteCharacterAction,
} from '../actions/PeopleActions';
import Repository from 'src/data/Repository';
import {FAVOURITE_TYPE} from 'src/shared/Constant';

const initialState: PeopleState = {
  characters: {},
  authors: {},
};

export const peopleReducer = createReducer(initialState, builder => {
  builder.addCase(getCharacterAction, (state, action) => {
    const {id, value} = action.payload;
    if (!state.characters[id]) {
      state.characters[id] = value;
    }
  });
  builder.addCase(setFavouriteCharacterAction, (state, action) => {
    const {id, value} = action.payload;
    Repository.setFavourite(FAVOURITE_TYPE.CHARACTER, id, value);
    if (state.characters[id]) {
      state.characters[id].is_favourite = value;
    }
  });
  builder.addCase(getAuthorAction, (state, action) => {
    const {id, value} = action.payload;
    if (!state.authors[id]) {
      state.authors[id] = value;
    }
  });
  builder.addCase(setFavouriteAuthorAction, (state, action) => {
    const {id, value} = action.payload;
    Repository.setFavourite(FAVOURITE_TYPE.AUTHOR, id, value);
    if (state.authors[id]) {
      state.authors[id].is_favourite = value;
    }
  });
});
