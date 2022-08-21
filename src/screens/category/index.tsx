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

function Category(props: CategoryScreenProp) {
  const {
    route: {
      params: {genre},
    },
    navigation,
  } = props;
  const dispach = useAppDispatch();

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
      dispach(topMangasThunk(page));
      return null;
    }
  } else {
    if (!categoryToMangaList) {
      const page = 1;
      dispach(categoryMangasThunk(genre.id, page));
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
    <Container>
      <TopBar title={genre.name} onBackPress={onBackPress} />
      <VerticalMangaList
        categoryMangaList={getData()}
        scrollHandlers={{onEndReached}}
        navigation={navigation}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

export default Category;
