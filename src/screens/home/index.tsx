import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

import {CoverManga, Genre, UnfinishedManga} from 'src/shared/Types';
import Greeting from './components/Greeting';
import CategoryHorizontalList from 'src/components/CategoryHorizontalList';

export interface HomeProps {
  unfinishedManga: UnfinishedManga;
  categories: {
    genre: Genre;
    mangaList: CoverManga[];
  }[];
}

function Home(props: HomeProps) {
  const {unfinishedManga, categories} = props;

  return (
    <HomeContainer>
      <FlatList
        ListHeaderComponent={<Greeting unfinishedManga={unfinishedManga} />}
        showsVerticalScrollIndicator={false}
        data={categories}
        renderItem={({item}) => (
          <CategoryHorizontalList
            key={item.genre.id}
            genre={item.genre}
            mangaList={item.mangaList}
          />
        )}
      />
    </HomeContainer>
  );
}

const HomeContainer = styled.View`
  padding: 16px 16px 0;
`;

export default Home;
