export interface ActionMap<T> {
  id: number;
  value: T;
}

import {
  AuthorDetail,
  Character,
  CharacterDetail,
  Genre,
  MangaDetail,
} from 'src/shared/Types';

export interface CategoryState {
  genres: Genre[];
  topMangas: MangaDetail[];
  mostPopulars: MangaDetail[];
  categoryToMangaList: {[key: number]: MangaDetail[]};
}

export interface MangaState {
  mangas: {[key: number]: MangaDetail};
  mangaCharacters: {[key: number]: Character[]};
}

export interface PeopleState {
  characters: {[key: number]: CharacterDetail};
  authors: {[key: number]: AuthorDetail};
}
