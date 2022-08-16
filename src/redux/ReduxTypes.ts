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

export interface UserState {
  language: string;
  theme: ThemeInterface & {theme: string};
  is_first_install: boolean;
  reading_count: number;
  finished_count: number;
  fav_manga_count: number;
}
