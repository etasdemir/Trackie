import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface FavouriteIconProps {
  onPress?: () => void;
  color: string;
  isEnabled: boolean;
}

function FavouriteIcon(props: FavouriteIconProps) {
  const {onPress, color, isEnabled} = props;

  const onFavouriteClick = useCallback(() => {
    console.log('on favourite click');
    onPress && onPress();
  }, [onPress]);

  const iconName = isEnabled ? 'cards-heart' : 'cards-heart-outline';

  return (
    <Button onPress={onFavouriteClick}>
      <Icon name={iconName} size={36} color={color} />
    </Button>
  );
}

const Button = styled.TouchableOpacity``;

export default FavouriteIcon;
