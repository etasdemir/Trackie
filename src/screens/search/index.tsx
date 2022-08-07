import React from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import SearchInput from './components/SearchInput';
import SearchRecent, {SearchRecentProps} from './components/SearchRecent';
import VerticalMangaList from 'src/components/VerticalMangaList';
import {CategoryManga, ColorProps} from 'src/shared/Types';
import theme from 'src/shared/theme';
import language from 'src/shared/language';
import {SearchScreenProp} from 'src/navigation/types';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {mostPopularMangasThunk} from 'src/redux/actions/CategoryActions';

export interface SearchProps extends SearchScreenProp {
  mostPopularMangaList: CategoryManga[];
  recents: SearchRecentProps['recents'];
}

// TODO
const recents: SearchRecentProps['recents'] = [
  'search 1',
  'random search 2',
  'Lorem ipsum dolor sit amet, consectetur',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
];

function Search(props: SearchScreenProp) {
  const {navigation} = props;
  const mostPopulars = useSelector(
    (state: RootState) => state.category.mostPopulars,
  );
  const dispatcher = useAppDispatch();
  const tabBarHeight = useBottomTabBarHeight();

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

  if (!mostPopulars || mostPopulars.length === 0) {
    const page = 1;
    dispatcher(mostPopularMangasThunk(page));
  }

  return (
    <Container tabBarHeight={tabBarHeight}>
      <SearchInput />
      <SearchRecent
        recents={recents}
        callback={(setter: (isVisible: boolean) => void) =>
          (setSearchRecentVisibility = setter)
        }
      />
      {mostPopulars.length > 0 && (
        <MostPopularMangaTitle color={theme.onView}>
          {language.getText('genre_most_popular')}
        </MostPopularMangaTitle>
      )}
      <VerticalMangaList
        categoryMangaList={mostPopulars}
        scrollHandlers={{onScrollTop, onScrollBottom}}
        navigation={navigation}
      />
    </Container>
  );
}

interface ContainerProps {
  tabBarHeight: number;
}

const Container = styled.View<ContainerProps>`
  flex: 1;
  padding: 16px 16px ${({tabBarHeight}) => tabBarHeight}px 16px;
`;

const MostPopularMangaTitle = styled.Text<ColorProps>`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${({color}) => color};
`;

export default Search;
