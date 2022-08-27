import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {Genre} from 'src/shared/Types';
import {RootChildScreenProp} from 'src/navigation/types';
import HorizontalList from './HorizontalList';
import useCategoryListData from './useCategoryListData';

interface Props {
  genre: Genre | Omit<Genre, 'count'>;
  navigation: RootChildScreenProp;
  type: string;
  renderItem: (itemInfo: ListRenderItemInfo<unknown>) => JSX.Element;
}

function GenericCategoryHorizontal(props: Props) {
  console.log('CurrentlyReadingHorizontal rendered', props.genre);
  const {genre, navigation, type, renderItem} = props;
  const data = useCategoryListData({type, genre}) as unknown[] | null;

  console.log('data', data);

  if (!data || data.length === 0) {
    return null;
  } else {
    return (
      <HorizontalList
        genre={'count' in genre ? genre : {...genre, count: data.length}}
        navigation={navigation}
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
