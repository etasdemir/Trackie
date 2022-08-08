import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import VerticalMangaItem from 'src/components/VerticalMangaItem';
import {
  BottomBarChildScreenProp,
  RootChildScreenProp,
} from 'src/navigation/types';
import {RootState} from 'src/redux/AppStore';

interface Props {
  navigation: BottomBarChildScreenProp | RootChildScreenProp;
  onPress: () => void;
}

function SearchResult(props: Props) {
  const mangaList = useSelector((state: RootState) => state.mangas.searchManga);
  const {navigation, onPress} = props;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={mangaList}
      renderItem={({item}) => (
        <VerticalMangaItem
          key={item.id}
          categoryManga={item}
          onPress={onPress}
          navigation={navigation}
        />
      )}
    />
  );
}

export default SearchResult;
