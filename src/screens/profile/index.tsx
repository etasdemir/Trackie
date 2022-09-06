import React from 'react';
import styled from 'styled-components/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

import Stat from './components/Stat';
import {ColorProps} from 'src/shared/Types';
import {RootState} from 'src/redux/AppStore';
import SettingsButton from 'src/components/SettingsButton';
import {ProfileScreenProp} from 'src/navigation/types';

enum MODAL_KEY {
  'THEME',
  'LANGUAGE',
  'CLEAR_DATA',
}

function Profile(props: ProfileScreenProp) {
  const {navigation} = props;
  const theme = useSelector((state: RootState) => state.user.theme);
  const language = useSelector((state: RootState) => state.user.language);
  const persistedLanguage = useSelector(
    (state: RootState) => state.user.persisted_language,
  );
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
      name: language.currently_reading,
      count: readingCount,
    },
    {
      name: language.reading_finished,
      count: finishedCount,
    },
    {
      name: language.favourite_list,
      count: favouriteMangas.length,
    },
  ];

  const onSettingsPress = (key: MODAL_KEY) => {
    switch (key) {
      case MODAL_KEY.THEME: {
        navigation.navigate('theme_selection_modal');
        break;
      }
      case MODAL_KEY.LANGUAGE: {
        navigation.navigate('language_selection_modal');
        break;
      }
      case MODAL_KEY.CLEAR_DATA: {
        navigation.navigate('delete_data_warn_modal');
        break;
      }
      default:
        return;
    }
  };

  return (
    <Container color={theme.background} tabBarHeight={tabBarHeight}>
      <StatContainer color={theme.primary}>
        {stats.map((stat, index) => (
          <Stat
            key={`${stat.name}+${index}`}
            name={stat.name}
            count={stat.count}
          />
        ))}
      </StatContainer>
      <SubTitle color={theme.onView}>{language.settings}</SubTitle>
      <SettingsButton
        name={language.theme}
        iconName="theme-light-dark"
        value={language[(theme.theme + '_theme') as never]}
        onSettingPress={() => onSettingsPress(MODAL_KEY.THEME)}
      />
      <SettingsButton
        name={language.language}
        iconName="earth"
        value={language[persistedLanguage.language as never]}
        onSettingPress={() => onSettingsPress(MODAL_KEY.LANGUAGE)}
      />
      <SettingsButton
        name={language.clear_all_data}
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

const Container = styled.View<ContainerProps & ColorProps>`
  flex: 1;
  background-color: ${({color}) => color};
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

const SubTitle = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 20px;
  margin-bottom: 12px;
`;

export default Profile;
