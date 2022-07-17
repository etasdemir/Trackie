import React from 'react';
import styled from 'styled-components/native';

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

  return (
    <ScrollContainer showsVerticalScrollIndicator={false}>
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

const ScrollContainer = styled.ScrollView`
  padding: 16px 16px 0;
  flex: 1;
`;

export default Bookmark;
