import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {RootState, withAppStore} from 'src/redux/AppStore';
import AppNavigation from 'src/navigation';
import {THEME} from 'src/shared/Constant';

function App() {
  const theme = useSelector((state: RootState) => state.user.theme);
  const barStyle =
    theme.theme === THEME.DARK ? 'light-content' : 'dark-content';

  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={theme.background}
        barStyle={barStyle}
      />
      <AppNavigation />
    </NavigationContainer>
  );
}

export default withAppStore<typeof App>(App);
