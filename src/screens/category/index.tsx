import React from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';

import {CategoryManga, Genre} from 'src/shared/Types';
import TopBar from 'src/components/TopBar';
import VerticalMangaItem from 'src/components/VerticalMangaItem';

export interface CategoryProps {
  genre: Genre;
  categoryMangaList: CategoryManga[];
}

function Category(props: CategoryProps) {
  const {genre, categoryMangaList} = props;

  const onBackPress = () => {
    console.log('pop from navigation stack');
  };

  return (
    <Container>
      <TopBar title={genre.name} onBackPress={onBackPress} />
      <FlatList
        data={categoryMangaList}
        renderItem={({item}) => (
          <VerticalMangaItem key={item.id} categoryManga={item} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

export default Category;
