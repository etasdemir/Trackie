import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {Genre} from 'src/shared/Types';
import HorizontalList from './HorizontalList';
import useCategoryListData from './useCategoryListData';
import {RootChildScreenProp} from 'src/navigation/types';

interface Props {
  genre: Genre | Omit<Genre, 'count'>;
  type: string;
  renderItem: (itemInfo: ListRenderItemInfo<unknown>) => JSX.Element;
  navigation: RootChildScreenProp;
}

function GenericCategoryHorizontal(props: Props) {
  const {genre, type, renderItem, navigation} = props;
  const data = useCategoryListData({type, genre}) as unknown[] | null;

  if (!data || data.length === 0) {
    return null;
  } else {
    return (
      <HorizontalList
        genre={'count' in genre ? genre : {...genre, count: data.length}}
        navigation={navigation}
        isViewAllVisible={'count' in genre}
        ListComponent={() => (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            horizontal={true}
          />
        )}
      />
    );
  }
}

export default GenericCategoryHorizontal;
