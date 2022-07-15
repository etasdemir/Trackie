import React from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import styled from 'styled-components';

interface Props {
  url: string;
}

function MangaCoverImage(props: Props) {
  const {url} = props;
  const imageSource: ImageSourcePropType = {
    uri: url,
    height: 165,
    width: 100,
  };

  return <AvatarImage resizeMode="center" source={imageSource} />;
}
const AvatarImage = styled(Image)`
  border-radius: 15px;
`;

export default MangaCoverImage;
