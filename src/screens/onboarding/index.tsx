import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';

import {OnboardingScreenProp} from 'src/navigation/types';
import {
  getUserThunk,
  setIsFirstInstallAction,
} from 'src/redux/actions/UserActions';
import {useAppDispatch} from 'src/redux/AppStore';
import Repository from 'src/data/Repository';

function Onboarding({navigation}: OnboardingScreenProp) {
  const dispatcher = useAppDispatch();
  const [readyState, setReadyState] = useState({
    isFirstInstall: false,
    isAppLoaded: false,
  });

  const navigateNextScreen = useCallback(() => {
    dispatcher(setIsFirstInstallAction(false));
    navigation.navigate('bottom_bar', {
      screen: 'bottom_bar_home',
    });
  }, [dispatcher, navigation]);

  const onOnboardImageClick = useCallback(() => {
    if (readyState.isAppLoaded) {
      navigateNextScreen();
    }
  }, [navigateNextScreen, readyState.isAppLoaded]);

  const loadApp = useCallback(async () => {
    dispatcher(getUserThunk());

    const dbIsFirstInstall = await Repository.getIsFirstInstall();

    setReadyState({
      isFirstInstall: dbIsFirstInstall,
      isAppLoaded: true,
    });
  }, [dispatcher]);

  if (!readyState.isFirstInstall && readyState.isAppLoaded) {
    setTimeout(() => {
      navigateNextScreen();
    }, 250);
  }

  if (!readyState.isAppLoaded) {
    loadApp();
  }

  return (
    <Container onPress={onOnboardImageClick}>
      <ImageBackground source={require('src/assets/onboarding_1.png')} />
    </Container>
  );
}

const Container = styled.TouchableWithoutFeedback`
  flex: 1;
`;

const ImageBackground = styled.Image`
  flex: 1;
`;

export default Onboarding;
