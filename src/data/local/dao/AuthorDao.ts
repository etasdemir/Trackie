import {AuthorDetailSchema, AuthorSchema} from '../schema/AuthorSchema';
import {Author, AuthorDetail} from 'src/shared/Types';
import {CoverMangaSchema} from '../schema/MangaSchema';
import BaseDao from './BaseDao';
import {SCHEMA_NAME} from '../SchemaName';

class AuthorDao {
  async getAuthorDetailById(
    id: number,
  ): Promise<AuthorDetailSchema | undefined> {
    return await BaseDao.getObjectById(SCHEMA_NAME.AUTHOR_DETAIL, id);
  }

  async getAuthorDetailsById(
    authorIds: number[],
  ): Promise<AuthorDetailSchema[]> {
    return await BaseDao.getObjectsById(SCHEMA_NAME.AUTHOR_DETAIL, authorIds);
  }

  async createAuthorDetail(author: AuthorDetail, works: CoverMangaSchema[]) {
    const obj: AuthorDetailSchema = {
      id: author.id,
      modify_date: Date.now(),
      name: author.name,
      img: author.img,
      bio: author.bio,
      birthDate: author.birthDate,
      birthPlace: author.birthPlace,
      works,
      socialMediaAccounts: {
        facebook: author.socialMediaAccounts.facebook,
        twitter: author.socialMediaAccounts.twitter,
        tumblr: author.socialMediaAccounts.tumblr,
        instagram: author.socialMediaAccounts.instagram,
        tiktok: author.socialMediaAccounts.tiktok,
        website: author.socialMediaAccounts.website,
      },
    };
    BaseDao.createObject(SCHEMA_NAME.AUTHOR_DETAIL, obj);
  }

  async getAuthorById(id: number): Promise<AuthorSchema | undefined> {
    return await BaseDao.getObjectById(SCHEMA_NAME.AUTHOR_SIMPLE, id);
  }

  async getAuthorsById(authorIds: number[]): Promise<AuthorSchema[]> {
    return await BaseDao.getObjectsById(SCHEMA_NAME.AUTHOR_SIMPLE, authorIds);
  }

  async createAuthor(author: Author) {
    const obj: AuthorSchema = {
      id: author.id,
      modify_date: Date.now(),
      name: author.name,
    };
    BaseDao.createObject(SCHEMA_NAME.AUTHOR_SIMPLE, obj);
  }
}

export default new AuthorDao();
