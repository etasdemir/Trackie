import {CoverMangaSchema, MangaSchema} from '../schema/MangaSchema';
import {Character, CoverManga, MangaDetail} from 'src/shared/Types';
import CharacterDao from './CharacterDao';
import AuthorDao from './AuthorDao';
import BaseDao from './BaseDao';
import {CharacterSchema} from '../schema/CharacterSchema';
import GenreDao from './GenreDao';
import {SCHEMA_NAME} from '../SchemaName';

class MangaService {
  async getCoverMangaById(id: number): Promise<CoverMangaSchema | undefined> {
    return await BaseDao.getObjectById(SCHEMA_NAME.COVER_MANGA, id);
  }

  async getCoverMangasById(mangaIds: number[]): Promise<CoverMangaSchema[]> {
    return await BaseDao.getObjectsById<CoverMangaSchema>(
      SCHEMA_NAME.COVER_MANGA,
      mangaIds,
    );
  }

  async createCoverManga(manga: CoverManga) {
    const author = await AuthorDao.getAuthorById(manga.author.id);
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
    BaseDao.createObject(SCHEMA_NAME.COVER_MANGA, coverManga);
  }

  async getMangaById(id: number): Promise<MangaSchema | undefined> {
    return await BaseDao.getObjectById<MangaSchema>(
      SCHEMA_NAME.MANGA_DETAIL,
      id,
    );
  }

  async getMangasById(ids: number[]): Promise<MangaSchema[]> {
    return await BaseDao.getObjectsById<MangaSchema>(
      SCHEMA_NAME.MANGA_DETAIL,
      ids,
    );
  }

  async createManga(manga: MangaDetail) {
    let author = await AuthorDao.getAuthorById(manga.author.id);
    const characterIds = manga.characters.map(item => item.id);
    const characters = await CharacterDao.getCharactersById(characterIds);
    const genreIds = manga.genres.map(item => item.id);
    const genres = await GenreDao.getGenresById(genreIds);
    if (!author) {
      await AuthorDao.createAuthor(manga.author);
      author = await AuthorDao.getAuthorById(manga.author.id);
      if (!author) {
        return;
      }
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
    BaseDao.createObject(SCHEMA_NAME.MANGA_DETAIL, obj);
  }

  async setFavouriteManga(isFavourite: boolean, mangaId: number) {
    BaseDao.setFavouriteField(SCHEMA_NAME.MANGA_DETAIL, mangaId, isFavourite);
  }

  async getFavouriteMangas(): Promise<MangaSchema[]> {
    return BaseDao.getFavourites<MangaSchema>(SCHEMA_NAME.MANGA_DETAIL);
  }

  async getMangaCharacters(mangaId: number): Promise<CharacterSchema[]> {
    const manga = await BaseDao.getObjectById<MangaSchema>(
      SCHEMA_NAME.MANGA_DETAIL,
      mangaId,
    );
    return manga?.characters ?? [];
  }

  async createMangaCharacters(mangaId: number, characters: Character[]) {
    for (let character of characters) {
      await CharacterDao.createCharacter(character);
    }
    const ids = characters.map(item => item.id);
    const values = await CharacterDao.getCharactersById(ids);
    await BaseDao.updateFields(
      SCHEMA_NAME.MANGA_DETAIL,
      mangaId,
      ['characters'],
      [values],
    );
  }
}

export default new MangaService();
