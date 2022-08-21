import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {FAVOURITE_TYPE} from 'src/shared/Constant';
import {
  addFavouriteThunk,
  removeFavouriteThunk,
} from 'src/redux/actions/UserActions';

export interface FavouriteIconProps {
  onPress?: () => void;
  color: string;
  type: string;
  itemId: number;
}

function FavouriteIcon(props: FavouriteIconProps) {
  const {onPress, color, type, itemId} = props;
  console.log('Favourite icon rendered for type:', type);
  const favourites = useSelector((state: RootState) => {
    switch (type) {
      case FAVOURITE_TYPE.MANGA: {
        return state.user.favourite_mangas;
      }
      case FAVOURITE_TYPE.AUTHOR: {
        return state.user.favourite_authors;
      }
      case FAVOURITE_TYPE.CHARACTER: {
        return state.user.favourite_characters;
      }
    }
    return state.user.favourite_mangas;
  });
  const dispatcher = useAppDispatch();

  let isFavorite = false;
  favourites.forEach(item => {
    if (item.id === itemId) {
      isFavorite = true;
    }
  });

  const onFavouriteClick = useCallback(() => {
    if (isFavorite) {
      dispatcher(removeFavouriteThunk(type, itemId));
    } else {
      dispatcher(addFavouriteThunk(type, itemId));
    }
    onPress && onPress();
  }, [dispatcher, isFavorite, itemId, onPress, type]);

  const iconName = isFavorite ? 'cards-heart' : 'cards-heart-outline';

  return (
    <Button onPress={onFavouriteClick}>
      <Icon name={iconName} size={36} color={color} />
    </Button>
  );
}

const Button = styled.TouchableOpacity``;

export default FavouriteIcon;
