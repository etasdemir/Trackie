import React from 'react';
import styled from 'styled-components/native';

import SearchInput from './components/SearchInput';
import SearchRecent, {SearchRecentProps} from './components/SearchRecent';
import VerticalMangaList from 'src/components/VerticalMangaList';
import {CategoryManga, ColorProps} from 'src/shared/Types';
import theme from 'src/shared/theme';
import language from 'src/shared/language';

export interface SearchProps {
  mostPopularMangaList: CategoryManga[];
  recents: SearchRecentProps['recents'];
}

function Search(props: SearchProps) {
  const {mostPopularMangaList, recents} = props;
  let setSearchRecentVisibility: (isVisible: boolean) => void | undefined;

  const onScrollTop = () => {
    if (setSearchRecentVisibility) {
      setSearchRecentVisibility(true);
    }
  };

  const onScrollBottom = () => {
    if (setSearchRecentVisibility) {
      setSearchRecentVisibility(false);
    }
  };

  return (
    <Container>
      <SearchInput />
      <SearchRecent
        recents={recents}
        callback={(setter: (isVisible: boolean) => void) =>
          (setSearchRecentVisibility = setter)
        }
      />
      <MostPopularMangaTitle color={theme.onView}>
        {language.getText('genre_most_popular')}
      </MostPopularMangaTitle>
      <VerticalMangaList
        categoryMangaList={mostPopularMangaList}
        scrollHandlers={{onScrollTop, onScrollBottom}}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 16px 16px 0;
`;

const MostPopularMangaTitle = styled.Text<ColorProps>`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: ${({color}) => color};
`;

export default Search;
