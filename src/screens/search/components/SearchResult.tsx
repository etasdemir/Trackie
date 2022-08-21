import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import VerticalMangaItem from 'src/components/VerticalMangaItem';
import {
  BottomBarChildScreenProp,
  RootChildScreenProp,
} from 'src/navigation/types';
import {RootState} from 'src/redux/AppStore';
import {SEARCH_RECENT} from 'src/shared/Constant';

interface Props {
  navigation: BottomBarChildScreenProp | RootChildScreenProp;
  onPress: (searched_item_id: number, type: string, name: string) => void;
}

function SearchResult(props: Props) {
  const mangaList = useSelector((state: RootState) => state.mangas.searchManga);
  const {navigation, onPress} = props;

  const onItemClick = (name: string, id: number) => {
    onPress(id, SEARCH_RECENT.MANGA, name);
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={mangaList}
      renderItem={({item}) => (
        <VerticalMangaItem
          key={item.id}
          categoryManga={item}
          onPress={onItemClick}
          navigation={navigation}
        />
      )}
    />
  );
}

export default SearchResult;
