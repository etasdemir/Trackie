import {AuthorModel} from './AuthorModel';
import {GenreModel} from './GenreModel';

export interface MangaModel {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
}

export interface MangaDetailModel {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  chapters?: number;
  volumes?: number;
  status: string;
  publishing: boolean;
  published: Published;
  score: number;
  scored: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  authors: AuthorModel[];
  serializations: Serialization[];
  genres: GenreModel[];
  explicit_genres: any[];
  themes: Theme[];
  demographics: Demographic[];
}

export interface Jpg {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Webp {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Images {
  jpg: Jpg;
  webp: Webp;
}

export interface From {
  day: number;
  month: number;
  year: number;
}

export interface To {
  day?: number;
  month?: number;
  year?: number;
}

export interface Prop {
  from: From;
  to: To;
}

export interface Published {
  from: Date;
  to?: Date;
  prop: Prop;
  string: string;
}

export interface Serialization {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Theme {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Demographic {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}
