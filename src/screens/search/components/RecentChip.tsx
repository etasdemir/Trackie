import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

import {ColorProps} from 'src/shared/Types';
import {RootState} from 'src/redux/AppStore';
import {SearchRecentPayload} from 'src/redux/actions/UserActions';

export interface RecentChipProps {
  recent: SearchRecentPayload;
  onSelect: (recent: SearchRecentPayload) => void;
  onClear: (recent: SearchRecentPayload) => void;
}

function RecentChip(props: RecentChipProps) {
  const {recent, onSelect, onClear} = props;
  const theme = useSelector((state: RootState) => state.user.theme);

  return (
    <Container color={theme.primaryLight} onPress={() => onSelect(recent)}>
      <ChipName numberOfLines={1} color={theme.onView}>
        {recent.name}
      </ChipName>
      <DeleteIconButton onPress={() => onClear(recent)}>
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
