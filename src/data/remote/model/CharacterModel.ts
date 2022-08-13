import {MangaModel} from './MangaModel';

export interface CharacterResponse {
  data: MangaCharacterModel[];
}

export interface MangaCharacterModel {
  character: CharacterModel;
  role: string;
}

export interface CharacterModel {
  mal_id: number;
  url: string;
  images: Images;
  name: string;
}

export interface CharacterDetailResponse {
  data: CharacterDetailModel;
}

export interface CharacterDetailModel {
  mal_id: number;
  url: string;
  images: Images;
  name: string;
  name_kanji: string;
  nicknames: string[];
  favorites: number;
  about: string;
  manga: any[];
}

export interface CharacterManga {
  role: string;
  manga: MangaModel;
}

export interface Jpg {
  image_url: string;
}

export interface Webp {
  image_url: string;
  small_image_url: string;
}

export interface Images {
  jpg: Jpg;
  webp: Webp;
}
