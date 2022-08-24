import React from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ColorProps} from 'src/shared/Types';
import {RootState} from 'src/redux/AppStore';

export interface SettingsButtonProps {
  iconName: string;
  name: string;
  value?: string;
  onSettingPress: () => void;
}

function SettingsButton(props: SettingsButtonProps) {
  const {iconName, name, value, onSettingPress} = props;
  const theme = useSelector((state: RootState) => state.user.theme);

  return (
    <Container onPress={onSettingPress}>
      <Icon name={iconName} size={30} color={theme.primary} />
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
