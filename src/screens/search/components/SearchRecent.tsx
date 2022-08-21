import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {LayoutAnimation} from 'react-native';
import {useSelector} from 'react-redux';

import ViewAllButton from 'src/components/ViewAllButton';
import {RootState} from 'src/redux/AppStore';
import language from 'src/shared/language';
import {ColorProps} from 'src/shared/Types';
import RecentChip from './RecentChip';

export interface SearchRecentProps {
  recents: string[];
  callback: (setter: (isVisible: boolean) => void) => void;
}

function SearchRecent(props: SearchRecentProps) {
  const {recents, callback} = props;
  const theme = useSelector((state: RootState) => state.user.theme);
  const [isVisible, setIsVisible] = useState(true);

  const visibilityCallback = useCallback((isViewVisible: boolean) => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
      duration: 250,
    });
    setIsVisible(isViewVisible);
  }, []);
  callback(visibilityCallback);

  if (!isVisible) {
    return null;
  }

  const clearSearchRecent = () => {
    console.log('clearSearchRecent');
  };

  const clearSingleItem = (name: string) => {
    console.log('clear search recent item:', name);
  };

  const onRecentSelected = (name: string) => {
    console.log('select recent item:', name);
  };

  return (
    <Container>
      <RecentHeader>
        <RecentTitle color={theme.onView}>
          {language.getText('search_recent')}
        </RecentTitle>
        <ViewAllButton
          onPress={clearSearchRecent}
          text={language.getText('search_clear_recent')}
        />
      </RecentHeader>
      <ChipContainer>
        {recents.map((value: string) => (
          <RecentChip
            key={value}
            name={value}
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
