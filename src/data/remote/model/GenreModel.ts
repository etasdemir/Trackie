import {Pagination} from './Pagination';
import {MangaDetailModel} from './MangaModel';

export interface GenresResponse {
  data: GenreModel[];
}

export interface GenreModel {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}

export interface GenreResponse {
  pagination: Pagination;
  data: MangaDetailModel[];
}
