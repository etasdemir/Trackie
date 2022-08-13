import {createAction} from '@reduxjs/toolkit';
import CategoryService from 'src/data/remote/service/CategoryService';
import {AppDispatch} from '../AppStore';
import {CategoryState} from '../ReduxTypes';

function withPayloadType<T>() {
  return (t: T) => ({payload: t});
}

export const getGenresAction = createAction(
  'CATEGORY_GET_GENRES',
  withPayloadType<CategoryState['genres']>(),
);

export const getGenresThunk = () => {
  return async (dispatch: AppDispatch) => {
    const result = await CategoryService.getGenres();
    dispatch(getGenresAction(result));
  };
};

export const topMangasAction = createAction(
  'CATEGORY_TOP_MANGAS',
  withPayloadType<CategoryState['topMangas']>(),
);

export const topMangasThunk = (page: number) => {
  return async (dispatch: AppDispatch) => {
    const result = await CategoryService.getTopMangaList(page);
    dispatch(topMangasAction(result));
  };
};

export const mostPopularMangasAction = createAction(
  'CATEGORY_MOST_POPULAR',
  withPayloadType<CategoryState['mostPopulars']>(),
);

export const mostPopularMangasThunk = (page: number) => {
  return async (dispatch: AppDispatch) => {
    const result = await CategoryService.getMostPopularMangaList(page);
    dispatch(mostPopularMangasAction(result));
  };
};

type CategoryMangaType = CategoryState['categoryToMangaList'][0];
export const categoryMangasAction = createAction(
  'CATEGORY_ID_MANGA_LIST',
  withPayloadType<{
    id: number;
    value: CategoryMangaType;
  }>(),
);

export const categoryMangasThunk = (categoryId: number, page: number) => {
  return async (dispatch: AppDispatch) => {
    const result = await CategoryService.getMangaListByCategoryId(
      categoryId,
      page,
    );
    dispatch(categoryMangasAction({id: categoryId, value: result}));
  };
};
