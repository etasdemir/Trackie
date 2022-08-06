import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import {ColorProps, Genre, MangaDetail} from 'src/shared/Types';
import theme from 'src/shared/theme';
import ViewAllButton from 'src/components/ViewAllButton';
import language from 'src/shared/language';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import HorizontalMangaItem from 'src/components/HorizontalMangaItem';
import {categoryMangasThunk} from 'src/redux/actions/CategoryActions';

interface Props {
  genre: Genre;
}

const isFetched: {[key: number]: boolean} = {};

function CategoryHorizontalList(props: Props) {
  console.log('CategoryHorizontalList rendered', props.genre.id);
  const {genre} = props;

  const {categoryToMangaList} = useSelector(
    (state: RootState) => state.category,
  );
  const dispatch = useAppDispatch();

  if (!categoryToMangaList[genre.id] && !isFetched[genre.id]) {
    isFetched[genre.id] = true;
    const page = 1;
    dispatch(categoryMangasThunk(genre.id, page));
    return null;
  }

  const onCategoryViewAllPress = () => {
    console.log('navigate to category screen with id:', genre.id);
  };

  if (
    !categoryToMangaList[genre.id] ||
    categoryToMangaList[genre.id].length === 0
  ) {
    return null;
  } else {
    return (
      <Container>
        <CategoryHeader>
          <CategoryTitle color={theme.onView}>{genre.name}</CategoryTitle>
          <ViewAllButton
            onPress={onCategoryViewAllPress}
            text={language.getText('view_all') + ' >'}
          />
        </CategoryHeader>
        <MangaFlatList
          showsHorizontalScrollIndicator={false}
          data={categoryToMangaList[genre.id]}
          renderItem={({item}) => (
            <HorizontalMangaItem key={item.id.toString()} manga={item} />
          )}
          horizontal={true}
        />
      </Container>
    );
  }
}

const Container = styled.View`
  margin: 20px 0;
`;

const CategoryHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const CategoryTitle = styled.Text<ColorProps>`
  font-size: 20px;
  font-weight: bold;
  color: ${({color}) => color};
`;

const MangaFlatList = styled(FlatList<MangaDetail>)`
  margin-top: 5px;
`;

const areEqual = (prevProps: Props, nextProps: Props) => {
  if (prevProps.genre.id === nextProps.genre.id) {
    return true;
  }
  return false;
};

export default React.memo(CategoryHorizontalList, areEqual);
