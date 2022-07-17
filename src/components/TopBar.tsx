import React from 'react';
import styled from 'styled-components/native';

import {ColorProps} from 'src/shared/Types';
import theme from 'src/shared/theme';

export interface TopBarProps {
  title?: string;
  onBackPress: () => void;
  RightElement?: JSX.Element;
  backgroundColor?: string;
}

function TopBar(props: TopBarProps) {
  const {title, onBackPress, RightElement, backgroundColor} = props;

  return (
    <Container color={backgroundColor ?? 'transparent'}>
      <BackButton color={theme.onView} onPress={onBackPress} />
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

const BackButton = styled.TouchableOpacity<ColorProps>`
  position: absolute;
  left: 40px;
  background-color: ${({color}) => color};
  width: 30px;
  height: 30px;
`;

const RightElementContainer = styled.View`
  position: absolute;
  right: 40px;
  width: 30px;
  height: 30px;
`;

export default TopBar;
