import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

import {ColorProps} from 'src/shared/Types';
import {RootState} from 'src/redux/AppStore';

export interface TopBarProps {
  title?: string;
  onBackPress: () => void;
  RightElement?: JSX.Element;
  backgroundColor?: string;
}

function TopBar(props: TopBarProps) {
  const {title, onBackPress, RightElement, backgroundColor} = props;
  const theme = useSelector((state: RootState) => state.user.theme);

  return (
    <Container color={backgroundColor ?? 'transparent'}>
      <BackButton onPress={onBackPress}>
        <Icon name="keyboard-backspace" size={36} color={theme.onView} />
      </BackButton>
      {title ? (
        <Title numberOfLines={1} color={theme.onView}>
          {title}
        </Title>
      ) : null}
      {RightElement ? (
        <RightElementContainer>
          {RightElement as JSX.Element}
        </RightElementContainer>
      ) : null}
    </Container>
  );
}

const Container = styled.View<ColorProps>`
  background-color: ${({color}) => color};
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 80px;
`;

const Title = styled.Text<ColorProps>`
  font-size: 24px;
  color: ${({color}) => color};
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 30px;
`;

const RightElementContainer = styled.View`
  position: absolute;
  right: 30px;
`;

export default TopBar;
