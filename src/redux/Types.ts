import {Genre, MangaDetail} from 'src/shared/Types';

export interface CategoryState {
  genres: Genre[];
  topMangas: MangaDetail[];
  mostPopulars: MangaDetail[];
  categoryToMangaList: {[key: number]: MangaDetail[]};
}
