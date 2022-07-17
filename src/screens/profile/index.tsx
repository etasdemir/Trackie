import React from 'react';
import styled from 'styled-components/native';

import Stat from './components/Stat';
import {ColorProps} from 'src/shared/Types';
import language from 'src/shared/language';
import theme, {themeStore} from 'src/shared/theme';
import SettingsButton from 'src/components/SettingsButton';

export interface ProfileProps {
  stats: {
    name: string;
    count: number;
  }[];
}

enum MODAL_KEY {
  'THEME',
  'LANGUAGE',
  'CLEAR_DATA',
}

function Profile(props: ProfileProps) {
  const {stats} = props;

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
    <Container>
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
        value={language.getText(themeStore.theme + '_theme')}
        onSettingPress={() => onSettingsPress(MODAL_KEY.THEME)}
      />
      <SettingsButton
        name={language.getText('language')}
        value={language.getText(language.getLanguage())}
        onSettingPress={() => onSettingsPress(MODAL_KEY.LANGUAGE)}
      />
      <SettingsButton
        name={language.getText('clear_all_data')}
        value={'>'}
        onSettingPress={() => onSettingsPress(MODAL_KEY.CLEAR_DATA)}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 16px;
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
