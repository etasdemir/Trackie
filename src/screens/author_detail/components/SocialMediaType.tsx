import React from 'react';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export interface SocialMediaType {
  type: string;
  urlScheme?: (username: string) => string;
  webUrl?: (username: string) => string;
  icon: (iconSize: number, iconColor: string) => JSX.Element;
}

export const SocialMedia: {[name: string]: SocialMediaType} = {
  facebook: {
    type: 'FACEBOOK',
    urlScheme: (username: string) => `fb://page/?id=${username}`,
    webUrl: (username: string) => `https://www.facebook.com/${username}`,
    icon: (iconSize: number, iconColor: string) => (
      <MCIIcon name="facebook" size={iconSize} color={iconColor} />
    ),
  },
  instagram: {
    type: 'INSTAGRAM',
    urlScheme: (username: string) => `instagram://user?username=${username}`,
    webUrl: (username: string) => `https://www.instagram.com/${username}`,
    icon: (iconSize: number, iconColor: string) => (
      <MCIIcon name="instagram" size={iconSize} color={iconColor} />
    ),
  },
  twitter: {
    type: 'TWITTER',
    urlScheme: (username: string) => `twitter://user?screen_name=${username}`,
    webUrl: (username: string) => `https://twitter.com/${username}`,
    icon: (iconSize: number, iconColor: string) => (
      <MCIIcon name="twitter" size={iconSize} color={iconColor} />
    ),
  },
  tiktok: {
    type: 'TIKTOK',
    urlScheme: (username: string) => `snssdk1233://user/profile/${username}`,
    webUrl: (username: string) => `https://www.tiktok.com/@${username}`,
    icon: (iconSize: number, iconColor: string) => (
      <FontAwesome5Icon name="tiktok" size={iconSize} color={iconColor} />
    ),
  },
  tumblr: {
    type: 'TUMBLR',
    urlScheme: (username: string) =>
      `tumblr://x-callback-url/blog?blogName=${username}`,
    webUrl: (username: string) => `https://${username}.tumblr.com`,
    icon: (iconSize: number, iconColor: string) => (
      <IonIcon name="logo-tumblr" size={iconSize} color={iconColor} />
    ),
  },
  website: {
    type: 'WEBSITE',
    webUrl: (url: string) => url,
    icon: (iconSize: number, iconColor: string) => (
      <MCIIcon name="web" size={iconSize} color={iconColor} />
    ),
  },
};
