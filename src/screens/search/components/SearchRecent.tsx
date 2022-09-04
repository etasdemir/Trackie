import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {LayoutAnimation} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from 'src/redux/AppStore';

import ViewAllButton from 'src/components/ViewAllButton';
import {ColorProps} from 'src/shared/Types';
import RecentChip from './RecentChip';
import {
  deleteAllSearchRecentAction,
  removeSearchRecentAction,
  SearchRecentPayload,
} from 'src/redux/actions/UserActions';
import {MAX_SEARCH_RECENT_COUNT, SEARCH_RECENT} from 'src/shared/Constant';
import {BottomBarChildScreenProp} from 'src/navigation/types';

export interface SearchRecentProps {
  callback: (setter: (isVisible: boolean) => void) => void;
  navigation: BottomBarChildScreenProp;
}

function SearchRecent(props: SearchRecentProps) {
  const {callback, navigation} = props;
  const theme = useSelector((state: RootState) => state.user.theme);
  const language = useSelector((state: RootState) => state.user.language);
  const searchRecents = useSelector(
    (state: RootState) => state.user.search_recent,
  );
  const dispatcher = useAppDispatch();
  const [isVisible, setIsVisible] = useState(true);

  const visibilityCallback = useCallback((isViewVisible: boolean) => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
      duration: 150,
    });
    setIsVisible(isViewVisible);
  }, []);
  callback(visibilityCallback);

  const clearSearchRecent = () => {
    dispatcher(deleteAllSearchRecentAction());
  };

  const clearSingleItem = useCallback(
    (recent: SearchRecentPayload) => {
      dispatcher(removeSearchRecentAction(recent));
    },
    [dispatcher],
  );

  const onRecentSelected = useCallback(
    (recent: SearchRecentPayload) => {
      switch (recent.type) {
        case SEARCH_RECENT.MANGA: {
          navigation.navigate('manga_detail', {
            mangaId: recent.searched_item_id,
          });
          break;
        }
        case SEARCH_RECENT.AUTHOR: {
          navigation.navigate('author_detail', {
            authorId: recent.searched_item_id,
          });
          break;
        }
        case SEARCH_RECENT.CHARACTER: {
          navigation.navigate('character_detail', {
            characterId: recent.searched_item_id,
          });
          break;
        }
      }
    },
    [navigation],
  );

  if (!isVisible) {
    return null;
  }

  return (
    <Container>
      <RecentHeader>
        <RecentTitle color={theme.onView}>{language.search_recent}</RecentTitle>
        <ViewAllButton
          onPress={clearSearchRecent}
          text={language.search_clear_recent}
        />
      </RecentHeader>
      <ChipContainer>
        {searchRecents
          .slice(Math.max(searchRecents.length - MAX_SEARCH_RECENT_COUNT, 0))
          .map((value: SearchRecentPayload) => (
            <RecentChip
              key={value.searched_item_id}
              recent={value}
              onSelect={onRecentSelected}
              onClear={clearSingleItem}
            />
          ))}
      </ChipContainer>
    </Container>
  );
}

const Container = styled.View`
  margin-top: 20px;
`;

const RecentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RecentTitle = styled.Text<ColorProps>`
  font-size: 20px;
  font-weight: bold;
  color: ${({color}) => color};
`;

const ChipContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default SearchRecent;
