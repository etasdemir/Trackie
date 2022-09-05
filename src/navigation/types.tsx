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
  chapter_selection_modal: {
    mangaId: number;
    currentChapter: number;
    totalChapter: number;
  };
  theme_selection_modal: undefined;
  language_selection_modal: undefined;
  delete_data_warn_modal: undefined;
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

export type ChapterSelectionModalProp = NativeStackScreenProps<
  RootStackParamList,
  'chapter_selection_modal'
>;

export type ThemeSelectionModalProp = NativeStackScreenProps<
  RootStackParamList,
  'theme_selection_modal'
>;

export type LanguageSelectionModalProp = NativeStackScreenProps<
  RootStackParamList,
  'language_selection_modal'
>;

export type DeleteDataWarnModalProp = NativeStackScreenProps<
  RootStackParamList,
  'delete_data_warn_modal'
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

export type BottomBarChildScreenProp =
  | HomeScreenProp['navigation']
  | SearchScreenProp['navigation']
  | BookmarkScreenProp['navigation']
  | ProfileScreenProp['navigation'];

export type RootChildScreenProp =
  | MangaScreenProp['navigation']
  | CategoryScreenProp['navigation']
  | AuthorScreenProp['navigation']
  | CharacterScreenProp['navigation']
  | ChapterSelectionModalProp['navigation']
  | ThemeSelectionModalProp['navigation']
  | LanguageSelectionModalProp['navigation']
  | DeleteDataWarnModalProp['navigation'];
