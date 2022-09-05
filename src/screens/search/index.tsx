import React, {useCallback, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {TextInput} from 'react-native';

import SearchInput from './components/SearchInput';
import SearchRecent from './components/SearchRecent';
import VerticalMangaList from 'src/components/VerticalMangaList';
import {CategoryManga, ColorProps} from 'src/shared/Types';
import {SearchScreenProp} from 'src/navigation/types';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {mostPopularMangasThunk} from 'src/redux/actions/CategoryActions';
import SearchResult from './components/SearchResult';
import {searchMangaThunk} from 'src/redux/actions/MangaActions';
import {addSearchRecentAction} from 'src/redux/actions/UserActions';

export interface SearchProps extends SearchScreenProp {
  mostPopularMangaList: CategoryManga[];
}

// TODO
// 1. ekran değişince search text sıfırlanmıyor. SearchResultItem tıklanırsa sil;
// 2. text yazıp search yapıp text silinirse hala search active olacak. Text '' ise isActive = false;

function Search(props: SearchScreenProp) {
  const {navigation} = props;
  const theme = useSelector((state: RootState) => state.user.theme);
  const language = useSelector((state: RootState) => state.user.language);
  const mostPopulars = useSelector(
    (state: RootState) => state.category.mostPopulars,
  );
  const dispatcher = useAppDispatch();
  const tabBarHeight = useBottomTabBarHeight();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const inputRef = useRef<TextInput>(null);

  let setSearchRecentVisibility: (isVisible: boolean) => void | undefined;

  const searchText = useCallback(
    (text: string) => {
      if (!isSearchActive) {
        setIsSearchActive(true);
      }
      const page = 1;
      dispatcher(searchMangaThunk(text, page));
    },
    [dispatcher, isSearchActive],
  );

  const onTextClear = useCallback(() => {
    if (isSearchActive) {
      setIsSearchActive(false);
    }
  }, [isSearchActive]);

  const onSearchItemPress = useCallback(
    (searched_item_id: number, type: string, name: string) => {
      if (isSearchActive) {
        setIsSearchActive(false);
      }
      if (inputRef.current) {
        inputRef.current.clear();
      }
      dispatcher(addSearchRecentAction({searched_item_id, type, name}));
    },
    [dispatcher, isSearchActive],
  );

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
    <Container color={theme.background} tabBarHeight={tabBarHeight}>
      <SearchInput
        inputRef={inputRef}
        searchText={searchText}
        onTextClear={onTextClear}
      />
      {isSearchActive && (
        <SearchResult onPress={onSearchItemPress} navigation={navigation} />
      )}
      {!isSearchActive && (
        <SearchRecent
          navigation={navigation}
          callback={(setter: (isVisible: boolean) => void) =>
            (setSearchRecentVisibility = setter)
          }
        />
      )}
      {!isSearchActive && mostPopulars.length > 0 && (
        <MostPopularMangaTitle color={theme.onView}>
          {language.genre_most_popular}
        </MostPopularMangaTitle>
      )}
      {!isSearchActive && (
        <VerticalMangaList
          categoryMangaList={mostPopulars}
          scrollHandlers={{onScrollTop, onScrollBottom}}
          navigation={navigation}
        />
      )}
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
