import {createReducer} from '@reduxjs/toolkit';

import {PeopleState} from '../ReduxTypes';
import {getAuthorAction, getCharacterAction} from '../actions/PeopleActions';

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
  builder.addCase(getAuthorAction, (state, action) => {
    const {id, value} = action.payload;
    if (!state.authors[id]) {
      state.authors[id] = value;
    }
  });
});
