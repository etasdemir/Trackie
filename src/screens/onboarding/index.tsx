import React from 'react';
import styled from 'styled-components/native';

import {OnboardingScreenProp} from 'src/navigation/types';

function Onboarding({navigation}: OnboardingScreenProp) {
  const onOnboardImageClick = () => {
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
