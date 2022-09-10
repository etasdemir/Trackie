import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import CharacterItem from './CharacterItem';
import {getMangaCharactersThunk} from 'src/redux/actions/MangaActions';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {RootChildScreenProp} from 'src/navigation/types';

interface Props {
  mangaId: number;
  navigation: RootChildScreenProp;
}

function MangaCharacterList(props: Props) {
  const {mangaId, navigation} = props;
  const {characters} = useSelector((state: RootState) => ({
    characters: state.mangas.mangaCharacters[mangaId],
  }));
  const dispatch = useAppDispatch();

  if (!characters || characters.length === 0) {
    dispatch(getMangaCharactersThunk(mangaId));
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={characters}
      renderItem={({item}) => (
        <CharacterItem key={item.id} character={item} navigation={navigation} />
      )}
    />
  );
}

export default MangaCharacterList;
