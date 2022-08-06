import React from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {getGenresThunk} from 'src/redux/actions/CategoryActions';
import MangaList from './components/MangaList';

// Delete later
const unfinishedManga = {
  id: 15,
  currentChapter: 191,
  totalChapter: 355,
  lastReadingDate: 'July 30, 2022',
  img: 'https://cdn.myanimelist.net/images/manga/2/253146l.jpg',
  title: 'Mahou Sensei Negima! Mahou Sensei Negima!',
  author: {
    id: 1883,
    name: 'Akamatsu, Ken',
  },
};

function Home() {
  console.log('home rendered');

  const allGenres = useSelector(
    (state: RootState) => state.category.genres,
    (a, b) => a.length === b.length,
  );
  const appDispatcher = useAppDispatch();

  if (allGenres.length === 0) {
    appDispatcher(getGenresThunk());
    // TODO Show loading skeleton
    return null;
  } else {
    return (
      <HomeContainer>
        <MangaList allGenres={allGenres} unfinishedManga={unfinishedManga} />
      </HomeContainer>
    );
  }
}

const HomeContainer = styled.View`
  padding: 16px 16px 0;
`;

export default React.memo(Home);
