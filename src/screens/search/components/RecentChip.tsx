import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ColorProps} from 'src/shared/Types';
import theme from 'src/shared/theme';

export interface RecentChipProps {
  name: string;
  onSelect: (name: string) => void;
  onClear: (name: string) => void;
}

function RecentChip(props: RecentChipProps) {
  const {name, onSelect, onClear} = props;

  return (
    <Container color={theme.primaryLight} onPress={() => onSelect(name)}>
      <ChipName numberOfLines={1} color={theme.onView}>
        {name}
      </ChipName>
      <DeleteIconButton onPress={() => onClear(name)}>
        <Icon name="close" color={theme.primaryDark} size={22} />
      </DeleteIconButton>
    </Container>
  );
}

const Container = styled.TouchableOpacity<ColorProps>`
  align-self: baseline;
  border-radius: 30px;
  background-color: ${({color}) => color};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  margin: 5px;
`;

const ChipName = styled.Text<ColorProps>`
  color: ${({color}) => color};
`;

const DeleteIconButton = styled.TouchableOpacity`
  margin-left: 8px;
  padding: 0 4px;
`;

export default RecentChip;
