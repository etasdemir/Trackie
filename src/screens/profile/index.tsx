import React from 'react';
import styled from 'styled-components/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

import Stat from './components/Stat';
import {ColorProps} from 'src/shared/Types';
import language from 'src/shared/language';
import {RootState} from 'src/redux/AppStore';
import SettingsButton from 'src/components/SettingsButton';

enum MODAL_KEY {
  'THEME',
  'LANGUAGE',
  'CLEAR_DATA',
}

function Profile() {
  const theme = useSelector((state: RootState) => state.user.theme);
  const langState = useSelector((state: RootState) => state.user.language);
  const tabBarHeight = useBottomTabBarHeight();
  const readingStatuses = useSelector(
    (state: RootState) => state.user.reading_statuses,
  );
  const favouriteMangas = useSelector(
    (state: RootState) => state.user.favourite_mangas,
  );
  let readingCount = 0;
  let finishedCount = 0;
  readingStatuses.forEach(reading => {
    if (reading.is_finished && !reading.is_reading) {
      finishedCount += 1;
    } else if (!reading.is_finished && reading.is_reading) {
      readingCount += 1;
    }
  });

  const stats = [
    {
      name: language.getText('currently_reading'),
      count: readingCount,
    },
    {
      name: language.getText('reading_finished'),
      count: finishedCount,
    },
    {
      name: language.getText('favourite_list'),
      count: favouriteMangas.length,
    },
  ];

  const onSettingsPress = (key: MODAL_KEY) => {
    switch (key) {
      case MODAL_KEY.THEME: {
        console.log('show theme modal');
        break;
      }
      case MODAL_KEY.LANGUAGE: {
        console.log('show language modal');
        break;
      }
      case MODAL_KEY.CLEAR_DATA: {
        console.log('show clear data modal');
        break;
      }
      default:
        return;
    }
  };

  return (
    <Container tabBarHeight={tabBarHeight}>
      <StatContainer color={theme.primary}>
        {stats.map((stat, index) => (
          <Stat
            key={`${stat.name}+${index}`}
            name={stat.name}
            count={stat.count}
          />
        ))}
      </StatContainer>
      <SettingsButton
        name={language.getText('theme')}
        iconName="theme-light-dark"
        value={language.getText(theme.theme + '_theme')}
        onSettingPress={() => onSettingsPress(MODAL_KEY.THEME)}
      />
      <SettingsButton
        name={language.getText('language')}
        iconName="earth"
        value={language.getText(langState ?? 'en')}
        onSettingPress={() => onSettingsPress(MODAL_KEY.LANGUAGE)}
      />
      <SettingsButton
        name={language.getText('clear_all_data')}
        iconName="delete-forever"
        value={'>'}
        onSettingPress={() => onSettingsPress(MODAL_KEY.CLEAR_DATA)}
      />
    </Container>
  );
}

interface ContainerProps {
  tabBarHeight: number;
}

const Container = styled.View<ContainerProps>`
  flex: 1;
  padding: 16px 16px ${({tabBarHeight}) => tabBarHeight + 16}px 16px;
`;

const StatContainer = styled.View<ColorProps>`
  background-color: ${({color}) => color};
  flex-direction: row;
  justify-content: space-evenly;
  padding: 40px 20px;
  margin: 20px 0 50px;
  border-radius: 40px;
`;

export default Profile;
