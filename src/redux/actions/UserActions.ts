import {createAction} from '@reduxjs/toolkit';
import {AppDispatch} from 'src/redux/AppStore';
import Repository from 'src/data/Repository';
import {MangaSchema} from 'src/data/local/schema/MangaSchema';
import {AuthorDetailSchema} from 'src/data/local/schema/AuthorSchema';
import {CharacterDetailSchema} from 'src/data/local/schema/CharacterSchema';
import {UserSchema} from 'src/data/local/schema/UserSchema';

function withPayloadType<T>() {
  return (t: T) => ({payload: t});
}

export const setThemeAction = createAction(
  'SET_USER_THEME',
  withPayloadType<{theme: string}>(),
);

export const setLanguageAction = createAction(
  'SET_LANGUAGE_ACTION',
  withPayloadType<{language: string}>(),
);

export const setIsFirstInstallAction = createAction(
  'SET_USER_IS_FIRST_INSTALL',
  withPayloadType<boolean>(),
);

export const setUserAction = createAction(
  'SET_USER_ACTION',
  withPayloadType<{user: UserSchema}>(),
);

export const getUserThunk = () => {
  return async (dispatch: AppDispatch) => {
    const user = await Repository.getUser();
    if (user) {
      dispatch(setUserAction({user}));
    }
  };
};

export const updateFavouritesAction = createAction(
  'UPDATE_USER_FAVOURITES',
  withPayloadType<{
    type: string;
    values: MangaSchema[] | AuthorDetailSchema[] | CharacterDetailSchema[];
  }>(),
);

export const addFavouriteThunk = (type: string, id: number) => {
  return async (dispatch: AppDispatch) => {
    await Repository.addFavourite(type, id);
    const favourites = await Repository.getFavourites(type);
    dispatch(updateFavouritesAction({type, values: favourites}));
  };
};

export const removeFavouriteThunk = (type: string, id: number) => {
  return async (dispatch: AppDispatch) => {
    await Repository.removeFavourite(type, id);
    const favourites = await Repository.getFavourites(type);
    dispatch(updateFavouritesAction({type, values: favourites}));
  };
};
