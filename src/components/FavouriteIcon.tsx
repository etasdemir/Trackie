import React from 'react';
import styled from 'styled-components/native';

import {ColorProps} from 'src/shared/Types';

export interface FavouriteIconProps {
  onPress?: () => void;
  color: string;
}

function FavouriteIcon(props: FavouriteIconProps) {
  const {onPress, color} = props;

  const onFavouriteClick = () => {
    console.log('on favourite click');
    onPress && onPress();
  };

  return (
    <Button onPress={onFavouriteClick} color={color}>
      <Icon />
    </Button>
  );
}

const Button = styled.TouchableOpacity<ColorProps>`
  width: 30px;
  height: 30px;
  background-color: ${({color}) => color};
`;

const Icon = styled.View``;

export default FavouriteIcon;
