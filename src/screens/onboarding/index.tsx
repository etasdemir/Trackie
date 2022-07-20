import React from 'react';
import styled from 'styled-components/native';

function Onboarding() {
  const onOnboardImageClick = () => {
    console.log('navigate to home screen');
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
