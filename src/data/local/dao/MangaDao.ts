import {MangaSchema} from '../schema/MangaSchema';
import {Character, MangaDetail} from 'src/shared/Types';
import CharacterDao from './CharacterDao';
import AuthorDao from './AuthorDao';
import BaseDao from './BaseDao';
import {CharacterSchema} from '../schema/CharacterSchema';
import {SCHEMA_NAME} from '../SchemaName';
import {GenreSchema} from '../schema/GenreSchema';

class MangaDao {
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

  async createManga(manga: MangaDetail, genres: GenreSchema[]) {
    let author = await AuthorDao.getAuthorById(manga.author.id);
    const characterIds = manga.characters.map(item => item.id);
    const characters = await CharacterDao.getCharactersById(characterIds);
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
      chapters: manga.chapters,
    };
    BaseDao.createObject(SCHEMA_NAME.MANGA_DETAIL, obj);
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

export default new MangaDao();
