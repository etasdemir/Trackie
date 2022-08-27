import React from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {getGenresThunk} from 'src/redux/actions/CategoryActions';
import MangaList from './components/MangaList';
import {HomeScreenProp} from 'src/navigation/types';

function Home(props: HomeScreenProp) {
  console.log('home rendered');

  const tabBarHeight = useBottomTabBarHeight();
  const allGenres = useSelector(
    (state: RootState) => state.category.genres,
    (a, b) => a.length === b.length,
  );
  const appDispatcher = useAppDispatch();

  if (allGenres.length === 0) {
    appDispatcher(getGenresThunk());
    return null;
  } else {
    return (
      <HomeContainer tabBarHeight={tabBarHeight}>
        <MangaList allGenres={allGenres} navigation={props.navigation} />
      </HomeContainer>
    );
  }
}

interface ContainerProps {
  tabBarHeight: number;
}

const HomeContainer = styled.View<ContainerProps>`
  padding: 16px 16px ${({tabBarHeight}) => tabBarHeight}px 16px;
`;

export default React.memo(Home);
