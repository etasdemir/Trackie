import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/Ionicons';

import {RootState} from 'src/redux/AppStore';

export enum SocialMedia {
  Facebook,
  Tumblr,
  Twitter,
  Website,
  Instagram,
  Tiktok,
}

interface SocialMediaIconProps {
  type: SocialMedia;
  url: string;
}

function SocialMediaIcon(props: SocialMediaIconProps) {
  const {type, url} = props;
  const theme = useSelector((state: RootState) => state.user.theme);

  const onIconClick = () => {
    console.log('social media:', type, 'url:', url);
  };

  const getIconByType = useCallback(() => {
    const iconSize = 30;
    const iconColor = theme.primaryDark;

    switch (type) {
      case SocialMedia.Facebook: {
        return <MCIIcon name="facebook" size={iconSize} color={iconColor} />;
      }
      case SocialMedia.Instagram: {
        return <MCIIcon name="instagram" size={iconSize} color={iconColor} />;
      }
      case SocialMedia.Tumblr: {
        return <IonIcon name="logo-tumblr" size={iconSize} color={iconColor} />;
      }
      case SocialMedia.Website: {
        return <MCIIcon name="web" size={iconSize} color={iconColor} />;
      }
      case SocialMedia.Twitter: {
        return <MCIIcon name="twitter" size={iconSize} color={iconColor} />;
      }
      case SocialMedia.Tiktok: {
        return (
          <FontAwesome5Icon name="tiktok" size={iconSize} color={iconColor} />
        );
      }
      default:
        return null;
    }
  }, [theme, type]);

  return <Button onPress={onIconClick}>{getIconByType()}</Button>;
}

const Button = styled.TouchableOpacity`
  margin: 0 16px;
`;

export default SocialMediaIcon;
