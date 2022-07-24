import {MangaModel} from './MangaModel';

export interface PeopleResponse {
  data: AuthorDetailModel;
}

export interface AuthorDetailModel {
  mal_id: number;
  url: string;
  website_url: string;
  images: AuthorDetailImage;
  name: string;
  given_name: string;
  family_name: string;
  alternate_names: string[];
  birthday: Date;
  favorites: number;
  about: string;
  manga: AuthorManga[];
}

export interface AuthorDetailImage {
  jpg: {
    image_url: string;
  };
}

export interface AuthorManga {
  position: string;
  manga: MangaModel;
}

export interface AuthorModel {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}
