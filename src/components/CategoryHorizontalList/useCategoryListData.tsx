import {useSelector} from 'react-redux';

import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {categoryMangasThunk} from 'src/redux/actions/CategoryActions';
import {CATEGORY_HORIZONTAL_TYPE} from 'src/shared/Constant';
import {getUserThunk} from 'src/redux/actions/UserActions';

interface Props {
  type: string;
  genre: {id: number; name: string};
}

const isFetched: {[key: string]: boolean} = {};

function useCategoryListData(props: Props) {
  const {type, genre} = props;
  const dispatch = useAppDispatch();

  const data = useSelector((state: RootState) => {
    switch (type) {
      case CATEGORY_HORIZONTAL_TYPE.MANGA: {
        return state.category.categoryToMangaList[genre.id];
      }
      case CATEGORY_HORIZONTAL_TYPE.READING: {
        return state.user.reading_statuses.filter(
          item => item.is_reading && !item.is_finished,
        );
      }
      case CATEGORY_HORIZONTAL_TYPE.FINISHED: {
        return state.user.reading_statuses.filter(
          item => !item.is_reading && item.is_finished,
        );
      }
      case CATEGORY_HORIZONTAL_TYPE.FAVOURITE_AUTHOR: {
        return state.user.favourite_authors;
      }
      case CATEGORY_HORIZONTAL_TYPE.FAVOURITE_CHARACTER: {
        return state.user.favourite_characters;
      }
      case CATEGORY_HORIZONTAL_TYPE.FAVOURITE_MANGA: {
        return state.user.favourite_mangas;
      }
      default:
        return [];
    }
  });

  if (!data && !isFetched[`${genre.name}${genre.id}`]) {
    isFetched[`${genre.name}${genre.id}`] = true;
    if (type === CATEGORY_HORIZONTAL_TYPE.MANGA) {
      const page = 1;
      dispatch(categoryMangasThunk(genre.id, page));
      return null;
    } else {
      dispatch(getUserThunk());
    }
  }

  return data;
}

export default useCategoryListData;
