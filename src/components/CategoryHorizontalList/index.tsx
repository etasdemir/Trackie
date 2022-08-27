import React from 'react';
import {
  AuthorDetail,
  CharacterDetail,
  CoverManga,
  Genre,
} from 'src/shared/Types';

import {CATEGORY_HORIZONTAL_TYPE} from 'src/shared/Constant';
import {
  BottomBarChildScreenProp,
  RootChildScreenProp,
} from 'src/navigation/types';
import GenericCategoryHorizontal from './GenericCategoryHorizontal';
import UnfinishedMangaItem from './UnfinishedMangaItem';
import {ListRenderItemInfo} from 'react-native';
import HorizontalMangaItem from '../HorizontalMangaItem';
import AvatarItem from './AvatarItem';
import FinishedMangaItem from './FinishedMangaItem';
import {ReadingStatusSchema} from 'src/data/local/schema/UserSchema';

interface Props {
  genre: Genre | Omit<Genre, 'count'>;
  type: string;
  navigation: RootChildScreenProp | BottomBarChildScreenProp;
}

function CategoryHorizontalList(props: Props) {
  const {type, genre, navigation} = props;
  let renderItem:
    | ((itemInfo: ListRenderItemInfo<unknown>) => JSX.Element)
    | null;

  switch (type) {
    case CATEGORY_HORIZONTAL_TYPE.FINISHED:
      renderItem = ({item}) => (
        <FinishedMangaItem
          key={(item as ReadingStatusSchema).mangaId.toString()}
          mangaId={(item as ReadingStatusSchema).mangaId}
          navigation={navigation as RootChildScreenProp}
        />
      );
      break;
    case CATEGORY_HORIZONTAL_TYPE.FAVOURITE_MANGA:
    case CATEGORY_HORIZONTAL_TYPE.MANGA:
      renderItem = ({item}) => (
        <HorizontalMangaItem
          key={(item as CoverManga).id.toString()}
          manga={item as CoverManga}
          navigation={navigation}
        />
      );
      break;
    case CATEGORY_HORIZONTAL_TYPE.READING:
      renderItem = ({item}) => (
        <UnfinishedMangaItem
          key={(item as ReadingStatusSchema).mangaId.toString()}
          mangaId={(item as ReadingStatusSchema).mangaId}
          navigation={navigation as RootChildScreenProp}
        />
      );
      break;
    case CATEGORY_HORIZONTAL_TYPE.FAVOURITE_AUTHOR:
      renderItem = ({item}) => (
        <AvatarItem
          key={(item as AuthorDetail).id.toString()}
          item={item as AuthorDetail}
          onItemClick={() =>
            (navigation as RootChildScreenProp).navigate('author_detail', {
              authorId: (item as AuthorDetail).id,
            })
          }
        />
      );
      break;
    case CATEGORY_HORIZONTAL_TYPE.FAVOURITE_CHARACTER:
      renderItem = ({item}) => (
        <AvatarItem
          key={(item as CharacterDetail).id.toString()}
          item={item as CharacterDetail}
          onItemClick={() =>
            (navigation as RootChildScreenProp).navigate('character_detail', {
              characterId: (item as CharacterDetail).id,
            })
          }
        />
      );
      break;
    default: {
      console.error('CategoryHorizontalList undefined type:', type);
      return null;
    }
  }
  return (
    <GenericCategoryHorizontal
      genre={genre}
      type={type}
      renderItem={renderItem}
      navigation={navigation as RootChildScreenProp}
    />
  );
}

export default CategoryHorizontalList;
