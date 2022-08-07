import React from 'react';
import styled from 'styled-components/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import CategoryHorizontalList from 'src/components/CategoryHorizontalList';
import {AuthorDetail, CoverManga, UnfinishedManga} from 'src/shared/Types';
import language from 'src/shared/language';

export interface BookmarkProps {
  currentlyReadings: UnfinishedManga[];
  favourites: CoverManga[];
  recentlyRead: CoverManga[];
  favoriteAuthors: AuthorDetail[];
}

function Bookmark(props: BookmarkProps) {
  const {currentlyReadings, favourites, recentlyRead, favoriteAuthors} = props;
  const genres = [
    {
      id: 1,
      name: language.getText('currently_reading'),
      data: currentlyReadings,
    },
    {
      id: 2,
      name: language.getText('favourite_list'),
      data: favourites,
    },
    {
      id: 3,
      name: language.getText('recently_read'),
      data: recentlyRead,
    },
    {
      id: 4,
      name: language.getText('favourite_authors'),
      data: favoriteAuthors,
    },
  ];
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollContainer
      showsVerticalScrollIndicator={false}
      tabBarHeight={tabBarHeight}>
      {genres.map(genre => (
        <CategoryHorizontalList
          key={genre.id}
          genre={genre}
          items={genre.data}
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
