import {GenreSchema, SpecialGenreSchema} from '../schema/GenreSchema';
import {Genre, MangaDetail} from 'src/shared/Types';
import BaseDao from './BaseDao';
import MangaDao from './MangaDao';
import {SCHEMA_NAME} from '../SchemaName';
import {
  MOST_POPULAR_MANGA_GENRE_ID,
  TOP_MANGA_GENRE_ID,
} from 'src/shared/Constant';

class GenreService {
  async getGenres(): Promise<Genre[]> {
    return await BaseDao.getAllObjectsWithOmit<Genre>(SCHEMA_NAME.GENRE, [
      'manga_list',
    ]);
  }

  async getGenresById(genreIds: number[]): Promise<GenreSchema[]> {
    return await BaseDao.getObjectsById(SCHEMA_NAME.GENRE, genreIds);
  }

  async createGenres(genres: Genre[]) {
    const genreSchemas: GenreSchema[] = [];
    for (let genre of genres) {
      const obj: GenreSchema = {
        id: genre.id,
        modify_date: Date.now(),
        name: genre.name,
        count: genre.count,
        manga_list: [],
      };
      genreSchemas.push(obj);
    }

    BaseDao.createObjects<GenreSchema>(SCHEMA_NAME.GENRE, genreSchemas);
  }

  async getMangaListByGenreId(genreId: number): Promise<MangaDetail[]> {
    return await this._getMangaListByGenreId(SCHEMA_NAME.GENRE, genreId);
  }

  async createGenreMangaList(genreId: number, mangas: MangaDetail[]) {
    await this._createGenreMangaList(SCHEMA_NAME.GENRE, genreId, mangas);
  }

  async getTopMangaList() {
    return await this._getMangaListByGenreId(
      SCHEMA_NAME.SPECIAL_GENRE,
      TOP_MANGA_GENRE_ID,
    );
  }

  async createTopMangaList(mangaList: MangaDetail[]) {
    const topGenre = await BaseDao.getObjectById(
      SCHEMA_NAME.SPECIAL_GENRE,
      TOP_MANGA_GENRE_ID,
    );
    if (!topGenre) {
      const topMangaGenre: SpecialGenreSchema = {
        id: TOP_MANGA_GENRE_ID,
        modify_date: Date.now(),
        manga_list: [],
      };
      await BaseDao.createObject<SpecialGenreSchema>(
        SCHEMA_NAME.SPECIAL_GENRE,
        topMangaGenre,
      );
    }
    await this._createGenreMangaList(
      SCHEMA_NAME.SPECIAL_GENRE,
      TOP_MANGA_GENRE_ID,
      mangaList,
    );
  }

  async getMostPopulars() {
    return await this._getMangaListByGenreId(
      SCHEMA_NAME.SPECIAL_GENRE,
      MOST_POPULAR_MANGA_GENRE_ID,
    );
  }

  async createMostPopulars(mangaList: MangaDetail[]) {
    const mostPopularGenre = await BaseDao.getObjectById(
      SCHEMA_NAME.SPECIAL_GENRE,
      MOST_POPULAR_MANGA_GENRE_ID,
    );
    if (!mostPopularGenre) {
      const mostPopular: SpecialGenreSchema = {
        id: MOST_POPULAR_MANGA_GENRE_ID,
        modify_date: Date.now(),
        manga_list: [],
      };
      await BaseDao.createObject<SpecialGenreSchema>(
        SCHEMA_NAME.SPECIAL_GENRE,
        mostPopular,
      );
    }
    await this._createGenreMangaList(
      SCHEMA_NAME.SPECIAL_GENRE,
      MOST_POPULAR_MANGA_GENRE_ID,
      mangaList,
    );
  }

  private async _createGenreMangaList(
    schema: string,
    genreId: number,
    mangas: MangaDetail[],
  ) {
    for (let manga of mangas) {
      const genreIds = manga.genres.map(item => item.id);
      const genres = await this.getGenresById(genreIds);
      await MangaDao.createManga(manga, genres);
    }
    const ids = mangas.map(item => item.id);
    const values = await MangaDao.getMangasById(ids);
    await BaseDao.updateFields(schema, genreId, ['manga_list'], [values]);
  }

  private async _getMangaListByGenreId(
    schema: string,
    genreId: number,
  ): Promise<MangaDetail[]> {
    const data = await BaseDao.getObjectById<GenreSchema>(schema, genreId);
    return data?.manga_list ?? [];
  }
}

export default new GenreService();
