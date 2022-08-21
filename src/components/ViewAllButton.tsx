import React from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import {RootState} from 'src/redux/AppStore';
import {ColorProps} from 'src/shared/Types';

export interface ViewAllBtnProps {
  text: string;
  onPress: () => void;
}

function ViewAllButton(props: ViewAllBtnProps) {
  const {text, onPress} = props;
  const theme = useSelector((state: RootState) => state.user.theme);

  return (
    <Button onPress={onPress} color={theme.onViewFaint}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}

const Button = styled.TouchableOpacity<ColorProps>`
  color: ${({color}) => color};
`;

const ButtonText = styled.Text`
  font-size: 15px;
`;

export default ViewAllButton;
