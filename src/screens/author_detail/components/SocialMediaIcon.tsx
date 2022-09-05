import React, {useCallback} from 'react';
import {Linking} from 'react-native';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import {RootState} from 'src/redux/AppStore';
import {SocialMediaType} from './SocialMediaType';

interface SocialMediaIconProps {
  link: string;
  socialMedia: SocialMediaType;
}

function SocialMediaIcon(props: SocialMediaIconProps) {
  const {link, socialMedia} = props;
  const theme = useSelector((state: RootState) => state.user.theme);

  const onIconClick = useCallback(async () => {
    const urlScheme = socialMedia.urlScheme
      ? socialMedia.urlScheme(link)
      : undefined;
    const webUrl = socialMedia.webUrl ? socialMedia.webUrl(link) : undefined;
    console.log('urlScheme', urlScheme);
    console.log('webUrl', webUrl);

    const isUrlSchemeSupported = urlScheme
      ? await Linking.canOpenURL(urlScheme)
      : false;
    if (isUrlSchemeSupported && urlScheme) {
      await Linking.openURL(urlScheme);
    } else if (webUrl) {
      await Linking.openURL(webUrl);
    }
  }, [link, socialMedia]);

  return (
    <Button onPress={onIconClick}>
      {socialMedia.icon(30, theme.primaryDark)}
    </Button>
  );
}

const Button = styled.TouchableOpacity`
  margin: 0 16px;
`;

export default SocialMediaIcon;
