import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {ColorProps, Genre} from 'src/shared/Types';
import Greeting from './Greeting';
import CategoryHorizontalList from 'src/components/CategoryHorizontalList';
import {RootState} from 'src/redux/AppStore';
import {BottomBarChildScreenProp} from 'src/navigation/types';
import TopMangas from './TopMangas';
import {CATEGORY_HORIZONTAL_TYPE} from 'src/shared/Constant';

interface Props {
  allGenres: Genre[];
  navigation: BottomBarChildScreenProp;
}

const HOME_MANGA_PER_SCROLL = 1;

function MangaList(props: Props) {
  console.log('home mangalist rendered');
  const {allGenres, navigation} = props;
  const theme = useSelector((state: RootState) => state.user.theme);
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
          <Greeting navigation={navigation} />
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
          type={CATEGORY_HORIZONTAL_TYPE.MANGA}
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
