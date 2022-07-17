import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

import {ColorProps, Genre} from 'src/shared/Types';
import theme from 'src/shared/theme';
import ViewAllButton from 'src/components/ViewAllButton';
import language from 'src/shared/language';
import {ItemType, resolveComponent} from './resolveComponent';

interface Props {
  genre: Genre;
  items: ItemType[];
}

function CategoryHorizontalList(props: Props) {
  const {genre, items} = props;

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
        data={items}
        renderItem={({item}) => resolveComponent(item)}
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
