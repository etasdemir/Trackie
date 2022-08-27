import React from 'react';
import styled from 'styled-components/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import language from 'src/shared/language';
import {BookmarkScreenProp} from 'src/navigation/types';
import CategoryHorizontalList from 'src/components/CategoryHorizontalList';
import {
  CATEGORY_HORIZONTAL_TYPE,
  CUSTOM_CATEGORY_IDS,
} from 'src/shared/Constant';

function Bookmark(props: BookmarkScreenProp) {
  const {navigation} = props;
  const tabBarHeight = useBottomTabBarHeight();
  const genres = [
    {
      id: CUSTOM_CATEGORY_IDS.READING,
      name: language.getText('currently_reading'),
      type: CATEGORY_HORIZONTAL_TYPE.READING,
    },
    {
      id: CUSTOM_CATEGORY_IDS.FINISHED,
      name: language.getText('recently_read'),
      type: CATEGORY_HORIZONTAL_TYPE.FINISHED,
    },
    {
      id: CUSTOM_CATEGORY_IDS.FAVOURITE_MANGA,
      name: language.getText('favourite_list'),
      type: CATEGORY_HORIZONTAL_TYPE.FAVOURITE_MANGA,
    },
    {
      id: CUSTOM_CATEGORY_IDS.FAVOURITE_AUTHOR,
      name: language.getText('favourite_authors'),
      type: CATEGORY_HORIZONTAL_TYPE.FAVOURITE_AUTHOR,
    },
    {
      id: CUSTOM_CATEGORY_IDS.FAVOURITE_CHARACTER,
      name: language.getText('characters'),
      type: CATEGORY_HORIZONTAL_TYPE.FAVOURITE_CHARACTER,
    },
  ];

  return (
    <ScrollContainer
      showsVerticalScrollIndicator={false}
      tabBarHeight={tabBarHeight}>
      {genres.map(genre => (
        <CategoryHorizontalList
          key={genre.id}
          genre={genre}
          navigation={navigation}
          type={genre.type}
        />
      ))}
    </ScrollContainer>
  );
}

interface ContainerProps {
  tabBarHeight: number;
}

const ScrollContainer = styled.ScrollView<ContainerProps>`
  padding: 16px 16px ${({tabBarHeight}) => tabBarHeight}px 16px;
  flex: 1;
`;

export default Bookmark;
