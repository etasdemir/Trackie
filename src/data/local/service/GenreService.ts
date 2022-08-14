import {GenreSchema} from '../schema/GenreSchema';
import {Genre, MangaDetail} from 'src/shared/Types';
import ServiceManager from './ServiceManager';
import MangaService from './MangaService';

class GenreService {
  private genreSchema = 'Genre';

  async getGenres(): Promise<GenreSchema[]> {
    return await ServiceManager.getAllObjects<GenreSchema>(this.genreSchema);
  }

  async getGenresById(genreIds: number[]): Promise<GenreSchema[]> {
    return await ServiceManager.getObjectsById(this.genreSchema, genreIds);
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

    ServiceManager.createObjects<GenreSchema>(this.genreSchema, genreSchemas);
  }

  async getMangaListByGenreId(genreId: number): Promise<MangaDetail[]> {
    const data = await ServiceManager.getObjectById<GenreSchema>(
      this.genreSchema,
      genreId,
    );
    return data?.manga_list ?? [];
  }

  async createGenreMangaList(genreId: number, mangas: MangaDetail[]) {
    for (let manga of mangas) {
      await MangaService.createManga(manga);
    }
    const ids = mangas.map(item => item.id);
    const values = await MangaService.getMangasById(ids);
    await ServiceManager.updateFields(
      this.genreSchema,
      genreId,
      ['manga_list'],
      values,
    );
  }
}

export default new GenreService();
