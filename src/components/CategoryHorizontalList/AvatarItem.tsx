import React from 'react';
import styled from 'styled-components/native';
import {ImageSourcePropType} from 'react-native';
import {useSelector} from 'react-redux';

import {ColorProps} from 'src/shared/Types';
import {RootState} from 'src/redux/AppStore';

interface AvatarItemProps {
  item: {
    id: number;
    name: string;
    img: string;
  };
  onItemClick: () => void;
}

function AvatarItem(props: AvatarItemProps) {
  const {item, onItemClick} = props;
  const theme = useSelector((state: RootState) => state.user.theme);
  const imageSource: ImageSourcePropType = {
    uri: item.img,
    height: 150,
    width: 100,
  };

  return (
    <Container onPress={onItemClick}>
      <AvatarImage resizeMode="stretch" source={imageSource} />
      <AvatarName color={theme.onView} numberOfLines={1}>
        {item.name}
      </AvatarName>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  padding: 0 4px;
  margin-bottom: 16px;
  width: 120px;
`;

const AvatarImage = styled.Image`
  border-radius: 40px;
`;

const AvatarName = styled.Text<ColorProps>`
  font-size: 15px;
  text-align: center;
  color: ${({color}) => color};
`;

export default AvatarItem;
