import React from 'react';
import {ScrollView, Text} from 'react-native';
import styled from 'styled-components';

import {CoverManga, Genre, UnfinishedManga} from 'src/shared/Types';
import Greeting from './components/Greeting';

interface Props {
  unfinishedManga: UnfinishedManga;
  categories: [
    {
      genre: Genre;
      mangaList: Array<CoverManga>;
    },
  ];
}

function Home(props: Props) {
  const {unfinishedManga, categories} = props;

  return (
    <HomeContainer>
      <Greeting unfinishedManga={unfinishedManga} />
      <Text>ASKDASKDAKSDK</Text>
    </HomeContainer>
  );
}

const HomeContainer = styled(ScrollView)`
  padding: 16px;
`;

export default Home;
