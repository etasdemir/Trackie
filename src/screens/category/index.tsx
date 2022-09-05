import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import TopBar from 'src/components/TopBar';
import VerticalMangaList from 'src/components/VerticalMangaList';
import {CategoryScreenProp} from 'src/navigation/types';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {
  categoryMangasThunk,
  topMangasThunk,
} from 'src/redux/actions/CategoryActions';
import {TOP_MANGA_GENRE_ID} from 'src/shared/Constant';
import {ColorProps} from 'src/shared/Types';

function Category(props: CategoryScreenProp) {
  const {
    route: {
      params: {genre},
    },
    navigation,
  } = props;
  const dispatch = useAppDispatch();

  const theme = useSelector((state: RootState) => state.user.theme);
  const categoryToMangaList = useSelector(
    (state: RootState) => state.category.categoryToMangaList[genre.id],
  );

  const topMangas = useSelector((state: RootState) => state.category.topMangas);

  const onEndReached = useCallback(() => {
    console.log('category end reached. request next page');
  }, []);

  const onBackPress = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  if (genre.id === TOP_MANGA_GENRE_ID) {
    if (!topMangas) {
      const page = 1;
      dispatch(topMangasThunk(page));
      return null;
    }
  } else {
    if (!categoryToMangaList) {
      const page = 1;
      dispatch(categoryMangasThunk(genre.id, page));
      return null;
    }
  }

  const getData = () => {
    if (genre.id === TOP_MANGA_GENRE_ID) {
      return topMangas;
    } else {
      return categoryToMangaList;
    }
  };

  return (
    <Container color={theme.background}>
      <TopBar title={genre.name} onBackPress={onBackPress} />
      <VerticalMangaList
        categoryMangaList={getData()}
        scrollHandlers={{onEndReached}}
        navigation={navigation}
      />
    </Container>
  );
}

const Container = styled.View<ColorProps>`
  flex: 1;
  background-color: ${({color}) => color};
`;

export default Category;
