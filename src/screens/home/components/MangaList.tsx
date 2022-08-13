import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';

import {ColorProps, Genre, UnfinishedManga} from 'src/shared/Types';
import Greeting from './Greeting';
import CategoryHorizontalList from 'src/components/CategoryHorizontalList';
import theme from 'src/shared/theme';
import {BottomBarChildScreenProp} from 'src/navigation/types';
import TopMangas from './TopMangas';

interface Props {
  allGenres: Genre[];
  unfinishedManga: UnfinishedManga;
  navigation: BottomBarChildScreenProp;
}

const HOME_MANGA_PER_SCROLL = 1;

function MangaList(props: Props) {
  console.log('home mangalist rendered');
  const {allGenres, unfinishedManga, navigation} = props;
  const [genres, setGenres] = useState(
    allGenres.slice(0, HOME_MANGA_PER_SCROLL),
  );

  const onEndReached = useCallback(() => {
    if (genres.length !== allGenres.length) {
      setGenres(prev => {
        const startIndex = prev.length;
        const endIndex =
          startIndex + HOME_MANGA_PER_SCROLL <= allGenres.length
            ? startIndex + HOME_MANGA_PER_SCROLL
            : allGenres.length;
        return [...prev, ...allGenres.slice(startIndex, endIndex)];
      });
    }
  }, [allGenres, genres.length]);

  const getData = useCallback(() => {
    if (genres.length === 0) {
      onEndReached();
      return [];
    }
    return genres;
  }, [genres, onEndReached]);

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Greeting unfinishedManga={unfinishedManga} />
          <TopMangas navigation={navigation} />
        </>
      }
      ListFooterComponent={
        genres.length !== allGenres.length ? (
          <ItemLoading size={'large'} color={theme.primary} />
        ) : null
      }
      keyExtractor={(item: Genre) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      data={getData()}
      renderItem={({item}) => (
        <CategoryHorizontalList
          key={item.id}
          genre={item}
          navigation={navigation}
        />
      )}
      onEndReached={onEndReached}
    />
  );
}

const ItemLoading = styled.ActivityIndicator<ColorProps>`
  margin-bottom: 36px;
  color: ${({color}) => color};
`;

export default React.memo(MangaList);
