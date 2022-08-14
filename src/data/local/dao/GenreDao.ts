import {GenreSchema} from '../schema/GenreSchema';
import {Genre, MangaDetail} from 'src/shared/Types';
import DaoManager from './DaoManager';
import MangaDao from './MangaDao';
import {SCHEMA_NAME} from '../SchemaName';

class GenreService {
  async getGenres(): Promise<GenreSchema[]> {
    return await DaoManager.getAllObjects<GenreSchema>(SCHEMA_NAME.GENRE);
  }

  async getGenresById(genreIds: number[]): Promise<GenreSchema[]> {
    return await DaoManager.getObjectsById(SCHEMA_NAME.GENRE, genreIds);
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

    DaoManager.createObjects<GenreSchema>(SCHEMA_NAME.GENRE, genreSchemas);
  }

  async getMangaListByGenreId(genreId: number): Promise<MangaDetail[]> {
    const data = await DaoManager.getObjectById<GenreSchema>(
      SCHEMA_NAME.GENRE,
      genreId,
    );
    return data?.manga_list ?? [];
  }

  async createGenreMangaList(genreId: number, mangas: MangaDetail[]) {
    for (let manga of mangas) {
      await MangaDao.createManga(manga);
    }
    const ids = mangas.map(item => item.id);
    const values = await MangaDao.getMangasById(ids);
    await DaoManager.updateFields(
      SCHEMA_NAME.GENRE,
      genreId,
      ['manga_list'],
      values,
    );
  }
}

export default new GenreService();
