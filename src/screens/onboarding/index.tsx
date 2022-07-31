import React from 'react';
import styled from 'styled-components/native';

import {useAppDispatch, useAppState} from 'src/redux/AppStore';
import {
  getGenresThunk,
  categoryMangasThunk,
} from 'src/redux/actions/CategoryActions';

function Onboarding() {
  const state = useAppState().category;
  console.log('Onboarding rendered', state);
  const appDispatcher = useAppDispatch();

  const onOnboardImageClick = () => {
    console.log('navigate to home screen');
    // appDispatcher(getGenresThunk());
    appDispatcher(categoryMangasThunk(73, 1));
    appDispatcher(categoryMangasThunk(73, 1));
    appDispatcher(categoryMangasThunk(73, 1));
    appDispatcher(categoryMangasThunk(73, 1));
    appDispatcher(categoryMangasThunk(73, 1));
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
