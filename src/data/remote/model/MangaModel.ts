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
  genres: GenreModel[];
  explicit_genres: any[];
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
