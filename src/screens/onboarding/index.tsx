import React from 'react';
import styled from 'styled-components/native';

import {useAppDispatch, useAppState} from 'src/redux/AppStore';
import {getGenresThunk} from 'src/redux/actions/CategoryActions';
import {OnboardingScreenProp} from 'src/navigation/types';

function Onboarding({navigation}: OnboardingScreenProp) {
  const state = useAppState().category;
  console.log('Onboarding rendered', state);
  const appDispatcher = useAppDispatch();

  const onOnboardImageClick = () => {
    console.log('navigate to home screen');
    appDispatcher(getGenresThunk());
    navigation.navigate('bottom_bar', {
      screen: 'bottom_bar_home',
    });
  };

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
