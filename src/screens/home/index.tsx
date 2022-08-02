import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

import {CoverManga, Genre, UnfinishedManga} from 'src/shared/Types';
import Greeting from './components/Greeting';
import CategoryHorizontalList from 'src/components/CategoryHorizontalList';
import {HomeScreenProp} from 'src/navigation/types';

export interface HomeProps extends HomeScreenProp {
  unfinishedManga: UnfinishedManga;
  categories: {
    genre: Genre;
    mangaList: CoverManga[];
  }[];
}

function Home(props: HomeScreenProp) {
  // const {unfinishedManga, categories} = props;
  const {navigation} = props;

  return null;

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
            items={item.mangaList}
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
