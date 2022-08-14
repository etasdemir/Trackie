import {CoverMangaSchema, MangaSchema} from '../schema/MangaSchema';
import {CoverManga, MangaDetail} from 'src/shared/Types';
import CharacterService from './CharacterService';
import AuthorService from './AuthorService';
import ServiceManager from './ServiceManager';
import {CharacterSchema} from '../schema/CharacterSchema';
import GenreService from './GenreService';

class MangaService {
  private coverMangaSchema = 'CoverManga';
  private mangaDetailSchema = 'Manga';

  async getCoverMangaById(id: number): Promise<CoverMangaSchema | undefined> {
    return await ServiceManager.getObjectById(this.coverMangaSchema, id);
  }

  async getCoverMangasById(mangaIds: number[]): Promise<CoverMangaSchema[]> {
    return await ServiceManager.getObjectsById<CoverMangaSchema>(
      'CoverManga',
      mangaIds,
    );
  }

  async createCoverManga(manga: CoverManga) {
    const author = await AuthorService.getAuthorById(manga.author.id);
    if (!author) {
      return;
    }
    const coverManga: CoverMangaSchema = {
      id: manga.id,
      modify_date: Date.now(),
      img: manga.img,
      title: manga.title,
      author,
    };
    ServiceManager.createObject(this.coverMangaSchema, coverManga);
  }

  // async updateCoverManga() {}

  async getMangaById(id: number): Promise<MangaSchema | undefined> {
    return await ServiceManager.getObjectById(this.mangaDetailSchema, id);
  }

  async getMangasById(ids: number[]): Promise<MangaSchema[]> {
    return await ServiceManager.getObjectsById(this.mangaDetailSchema, ids);
  }

  async createManga(manga: MangaDetail) {
    const author = await AuthorService.getAuthorById(manga.author.id);
    const characterIds = manga.characters.map(item => item.id);
    const characters = await CharacterService.getCharactersById(characterIds);
    const genreIds = manga.genres.map(item => item.id);
    const genres = await GenreService.getGenresById(genreIds);
    if (!author) {
      return;
    }

    const obj: MangaSchema = {
      id: manga.id,
      modify_date: Date.now(),
      is_favourite: false,
      img: manga.img,
      title: manga.title,
      author,
      genres,
      rank: manga.rank,
      popularity: manga.popularity,
      members: manga.members,
      characters,
      score: manga.score,
      scoredBy: manga.scoredBy,
      synopsis: manga.synopsis,
      reading_status: {
        is_reading: false,
        is_finished: false,
        finish_date: undefined,
        last_read_page: 0,
        last_read_time: 0,
      },
    };
    ServiceManager.createObject(this.mangaDetailSchema, obj);
  }

  async setFavouriteManga(isFavourite: boolean, mangaId: number) {
    ServiceManager.setFavouriteField(
      this.mangaDetailSchema,
      mangaId,
      isFavourite,
    );
  }

  async getMangaCharacters(mangaId: number): Promise<CharacterSchema[]> {
    const manga = await ServiceManager.getObjectById<MangaSchema>(
      this.mangaDetailSchema,
      mangaId,
    );
    return manga?.characters ?? [];
  }
}

export default new MangaService();
