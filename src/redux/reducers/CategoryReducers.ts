import {createReducer} from '@reduxjs/toolkit';
import {CategoryState} from '../ReduxTypes';
import {
  getGenresAction,
  mostPopularMangasAction,
  topMangasAction,
  categoryMangasAction,
} from '../actions/CategoryActions';

const initialState: CategoryState = {
  genres: [],
  topMangas: [],
  mostPopulars: [],
  categoryToMangaList: {},
};

export const categoryReducer = createReducer(initialState, builder => {
  builder.addCase(getGenresAction, (state, action) => {
    if (state.genres.length !== 0) {
      return state;
    }
    state.genres = action.payload;
    return state;
  });
  builder.addCase(topMangasAction, (state, action) => {
    state.topMangas = action.payload;
  });
  builder.addCase(mostPopularMangasAction, (state, action) => {
    state.mostPopulars = action.payload;
  });
  builder.addCase(categoryMangasAction, (state, action) => {
    const {id, value} = action.payload;
    state.categoryToMangaList[id] = value;
  });
});
