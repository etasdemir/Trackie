import LanguageInterface from 'src/shared/language/languageInterface';
import {UserSchema} from 'src/data/local/schema/UserSchema';
import {ThemeInterface} from 'src/shared/theme';
import {
  AuthorDetail,
  Character,
  CharacterDetail,
  Genre,
  MangaDetail,
} from 'src/shared/Types';

export interface ActionMap<T> {
  id: number;
  value: T;
}

export interface CategoryState {
  genres: Genre[];
  topMangas: MangaDetail[];
  mostPopulars: MangaDetail[];
  categoryToMangaList: {[key: number]: MangaDetail[]};
}

export interface MangaState {
  mangas: {[key: number]: MangaDetail};
  mangaCharacters: {[key: number]: Character[]};
  searchManga: MangaDetail[];
}

export interface PeopleState {
  characters: {[key: number]: CharacterDetail};
  authors: {[key: number]: AuthorDetail};
}

interface ModifiedUserProperties {
  theme: ThemeInterface;
  language: LanguageInterface;
}
export interface UserState {
  user: UserSchema & ModifiedUserProperties;
}
