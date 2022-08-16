import React from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import {RootState} from 'src/redux/AppStore';
import {ColorProps} from 'src/shared/Types';

export enum SocialMedia {
  Facebook,
  Tumblr,
  Twitter,
  Website,
  Instagram,
}

interface SocialMediaIconProps {
  type: SocialMedia;
  url: string;
}

function SocialMediaIcon(props: SocialMediaIconProps) {
  const {type, url} = props;
  const {theme} = useSelector((state: RootState) => state.user);

  const onIconClick = () => {
    console.log('social media:', type, 'url:', url);
  };

  switch (type) {
    case SocialMedia.Facebook: {
      break;
    }
    case SocialMedia.Instagram: {
      break;
    }
    case SocialMedia.Tumblr: {
      break;
    }
    case SocialMedia.Website: {
      break;
    }
    case SocialMedia.Twitter: {
      break;
    }
    default:
      return null;
  }

  return (
    <Button onPress={onIconClick}>
      <Icon color={theme.primaryLight} />
    </Button>
  );
}

const Button = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  margin: 0 16px;
`;

const Icon = styled.View<ColorProps>`
  background-color: ${({color}) => color};
  flex: 1;
`;

export default SocialMediaIcon;
