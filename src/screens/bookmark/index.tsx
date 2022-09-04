import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {BookmarkScreenProp} from 'src/navigation/types';
import CategoryHorizontalList from 'src/components/CategoryHorizontalList';
import {
  CATEGORY_HORIZONTAL_TYPE,
  CUSTOM_CATEGORY_IDS,
} from 'src/shared/Constant';
import {RootState} from 'src/redux/AppStore';

function Bookmark(props: BookmarkScreenProp) {
  const {navigation} = props;
  const language = useSelector((state: RootState) => state.user.language);
  const tabBarHeight = useBottomTabBarHeight();
  const genres = [
    {
      id: CUSTOM_CATEGORY_IDS.READING,
      name: language.currently_reading,
      type: CATEGORY_HORIZONTAL_TYPE.READING,
    },
    {
      id: CUSTOM_CATEGORY_IDS.FINISHED,
      name: language.recently_read,
      type: CATEGORY_HORIZONTAL_TYPE.FINISHED,
    },
    {
      id: CUSTOM_CATEGORY_IDS.FAVOURITE_MANGA,
      name: language.favourite_list,
      type: CATEGORY_HORIZONTAL_TYPE.FAVOURITE_MANGA,
    },
    {
      id: CUSTOM_CATEGORY_IDS.FAVOURITE_AUTHOR,
      name: language.favourite_authors,
      type: CATEGORY_HORIZONTAL_TYPE.FAVOURITE_AUTHOR,
    },
    {
      id: CUSTOM_CATEGORY_IDS.FAVOURITE_CHARACTER,
      name: language.characters,
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
  padding: 16px 16px 0 16px;
  margin-bottom: ${({tabBarHeight}) => tabBarHeight + 10}px;
  flex: 1;
`;

export default Bookmark;
