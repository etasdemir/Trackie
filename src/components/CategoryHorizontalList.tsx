import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

import {ColorProps, CoverManga, Genre, UnfinishedManga} from 'src/shared/Types';
import theme from 'src/shared/theme';
import ViewAllButton from 'src/components/ViewAllButton';
import language from 'src/shared/language';
import HorizontalMangaItem from 'src/components/HorizontalMangaItem';

type ItemType = CoverManga | UnfinishedManga;

interface Props {
  genre: Genre;
  mangaList: Array<ItemType>;
}

function CategoryHorizontalList(props: Props) {
  const {genre, mangaList} = props;

  const onCategoryViewAllPress = () => {
    console.log('navigate to category screen with id:', genre.id);
  };

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
        data={mangaList}
        renderItem={({item, index}) => (
          <HorizontalMangaItem key={`${item.id}+${index}`} manga={item} />
        )}
        horizontal={true}
      />
    </Container>
  );
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

const MangaFlatList = styled(FlatList<ItemType>)`
  margin-top: 5px;
`;

export default CategoryHorizontalList;
