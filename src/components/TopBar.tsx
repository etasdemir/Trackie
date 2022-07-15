import React from 'react';
import styled from 'styled-components/native';

import {ColorProps} from 'src/shared/Types';
import theme from 'src/shared/theme';

export interface TopBarProps {
  title?: string;
  onBackPress: () => void;
}

function TopBar(props: TopBarProps) {
  const {title, onBackPress} = props;

  return (
    <Container>
      <BackButton color={theme.onView} onPress={onBackPress} />
      {title ? <Title color={theme.onView}>{title}</Title> : null}
    </Container>
  );
}

const Container = styled.View`
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

export default TopBar;
