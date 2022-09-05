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
  const theme = useSelector((state: RootState) => state.user.theme);
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
    <Container color={theme.background} tabBarHeight={tabBarHeight}>
      <ScrollContainer showsVerticalScrollIndicator={false}>
        {genres.map(genre => (
          <CategoryHorizontalList
            key={genre.id}
            genre={genre}
            navigation={navigation}
            type={genre.type}
          />
        ))}
      </ScrollContainer>
    </Container>
  );
}

interface ContainerProps {
  tabBarHeight: number;
  color: string;
}

const Container = styled.View<ContainerProps>`
  flex: 1;
  background-color: ${({color}) => color};
  padding: 16px 16px ${({tabBarHeight}) => tabBarHeight + 10}px 16px;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export default Bookmark;
