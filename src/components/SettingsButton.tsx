import React from 'react';
import styled from 'styled-components/native';

import {ColorProps} from 'src/shared/Types';
import theme from 'src/shared/theme';

export interface SettingsButtonProps {
  name: string;
  value?: string;
  onSettingPress: () => void;
}

function SettingsButton(props: SettingsButtonProps) {
  const {name, value, onSettingPress} = props;

  return (
    <Container onPress={onSettingPress}>
      <Icon />
      <Name color={theme.onView}>{name}</Name>
      {value && <ActiveValue color={theme.onViewFaint}>{value}</ActiveValue>}
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

const Icon = styled.View`
  background-color: lightcoral;
  width: 24px;
  height: 24px;
`;

const Name = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 15px;
  margin-left: 16px;
`;

const ActiveValue = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 15px;
  margin-left: auto;
`;

export default SettingsButton;
