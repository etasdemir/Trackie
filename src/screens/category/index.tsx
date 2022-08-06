import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import TopBar from 'src/components/TopBar';
import VerticalMangaList from 'src/components/VerticalMangaList';
import {CategoryScreenProp} from 'src/navigation/types';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {categoryMangasThunk} from 'src/redux/actions/CategoryActions';

function Category(props: CategoryScreenProp) {
  const {
    route: {
      params: {genre},
    },
    navigation,
  } = props;
  const dispach = useAppDispatch();

  const categoryToMangaList = useSelector(
    (state: RootState) => state.category.categoryToMangaList,
  );

  const onEndReached = useCallback(() => {
    console.log('category end reached. request next page');
  }, []);

  const onBackPress = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  if (!categoryToMangaList[genre.id]) {
    const page = 1;
    dispach(categoryMangasThunk(genre.id, page));
    return null;
  }

  return (
    <Container>
      <TopBar title={genre.name} onBackPress={onBackPress} />
      <VerticalMangaList
        categoryMangaList={categoryToMangaList[genre.id]}
        scrollHandlers={{onEndReached}}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

export default Category;
