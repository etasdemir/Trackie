import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {Genre} from 'src/shared/Types';
import HorizontalList from './HorizontalList';
import useCategoryListData from './useCategoryListData';

interface Props {
  genre: Genre | Omit<Genre, 'count'>;
  type: string;
  renderItem: (itemInfo: ListRenderItemInfo<unknown>) => JSX.Element;
}

function GenericCategoryHorizontal(props: Props) {
  const {genre, type, renderItem} = props;
  const data = useCategoryListData({type, genre}) as unknown[] | null;

  console.log('data', data);

  if (!data || data.length === 0) {
    return null;
  } else {
    return (
      <HorizontalList
        genre={'count' in genre ? genre : {...genre, count: data.length}}
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
