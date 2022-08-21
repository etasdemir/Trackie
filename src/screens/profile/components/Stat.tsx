import React from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import {ColorProps} from 'src/shared/Types';
import {RootState} from 'src/redux/AppStore';

interface StatProps {
  name: string;
  count: number;
}

function Stat(props: StatProps) {
  const {name, count} = props;
  const theme = useSelector((state: RootState) => state.user.theme);

  return (
    <Container>
      <CountText color={theme.onView}>{count}</CountText>
      <NameText color={theme.onView}>{name}</NameText>
    </Container>
  );
}

const Container = styled.View`
  align-items: center;
`;

const CountText = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 18px;
`;

const NameText = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 14px;
  margin-top: 20px;
`;

export default Stat;
