import {CoverMangaSchema} from '../schema/MangaSchema';
import {CoverManga} from 'src/shared/Types';
import {SCHEMA_NAME} from '../SchemaName';
import BaseDao from './BaseDao';
import AuthorDao from './AuthorDao';

class CoverMangaDao {
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
}

export default new CoverMangaDao();
