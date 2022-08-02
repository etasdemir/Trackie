import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Genre} from 'src/shared/Types';

export type RootStackParamList = {
  onboarding: undefined;
  category: {genre: Genre};
  author_detail: {authorId: number};
  manga_detail: {mangaId: number};
  character_detail: {characterId: number};
  bottom_bar: NavigatorScreenParams<BottomBarParamList>;
};

export type BottomBarParamList = {
  bottom_bar_home: undefined;
  bottom_bar_search: undefined;
  bottom_bar_bookmark: undefined;
  bottom_bar_profile: undefined;
};

export type OnboardingScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'onboarding'
>;

export type CategoryScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'category'
>;

export type AuthorScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'author_detail'
>;

export type MangaScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'manga_detail'
>;

export type CharacterScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'character_detail'
>;

export type BottomBarProp = NativeStackScreenProps<
  RootStackParamList,
  'bottom_bar'
>;

export type HomeScreenProp = CompositeScreenProps<
  BottomTabScreenProps<BottomBarParamList, 'bottom_bar_home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type SearchScreenProp = CompositeScreenProps<
  BottomTabScreenProps<BottomBarParamList, 'bottom_bar_search'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type BookmarkScreenProp = CompositeScreenProps<
  BottomTabScreenProps<BottomBarParamList, 'bottom_bar_bookmark'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ProfileScreenProp = CompositeScreenProps<
  BottomTabScreenProps<BottomBarParamList, 'bottom_bar_profile'>,
  NativeStackScreenProps<RootStackParamList>
>;
