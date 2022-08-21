import {CharacterDetailSchema} from '../schema/CharacterSchema';
import {AuthorDetailSchema} from '../schema/AuthorSchema';
import {SearchRecentSchema, UserSchema} from '../schema/UserSchema';
import {SCHEMA_NAME} from '../SchemaName';
import BaseDao from './BaseDao';
import {FAVOURITE_TYPE} from 'src/shared/Constant';
import {MangaSchema} from '../schema/MangaSchema';
import MangaDao from './MangaDao';
import AuthorDao from './AuthorDao';
import CharacterDao from './CharacterDao';

const USER_ID = 1;

class UserDao {
  async getUser() {
    const user = await BaseDao.getCopyObjectById<UserSchema>(
      SCHEMA_NAME.USER,
      USER_ID,
    );
    if (!user) {
      const newUser: UserSchema = {
        id: USER_ID,
        modify_date: Date.now(),
        is_first_install: true,
        reading_statuses: [],
        favourite_mangas: [],
        favourite_authors: [],
        favourite_characters: [],
        search_recent: [],
      };
      await BaseDao.createObject(SCHEMA_NAME.USER, newUser);
      return await BaseDao.getCopyObjectById<UserSchema>(
        SCHEMA_NAME.USER,
        USER_ID,
      );
    }
    return user;
  }

  async setTheme(theme: string) {
    const obj = {id: USER_ID, theme};
    await BaseDao.createObject(SCHEMA_NAME.USER, obj);
  }

  async getTheme(): Promise<string | undefined> {
    const user = await BaseDao.getObjectById<UserSchema>(
      SCHEMA_NAME.USER,
      USER_ID,
    );
    return user?.theme;
  }

  async setLanguage(language: string) {
    const obj = {id: USER_ID, language};
    await BaseDao.createObject(SCHEMA_NAME.USER, obj);
  }

  async getLanguage(): Promise<string | undefined> {
    const user = await BaseDao.getObjectById<UserSchema>(
      SCHEMA_NAME.USER,
      USER_ID,
    );
    return user?.language;
  }

  async getIsFirstInstall(): Promise<boolean> {
    const user = await BaseDao.getObjectById<UserSchema>(
      SCHEMA_NAME.USER,
      USER_ID,
    );
    return user?.is_first_install ?? true;
  }

  async setIsFirstInstall(value: boolean) {
    const obj = {id: USER_ID, is_first_install: value};
    await BaseDao.createObject(SCHEMA_NAME.USER, obj);
  }

  async addFavourite(type: string, id: number) {
    switch (type) {
      case FAVOURITE_TYPE.MANGA: {
        const manga = await MangaDao.getMangaById(id);
        BaseDao.addElementToFields<MangaSchema>(
          SCHEMA_NAME.USER,
          USER_ID,
          ['favourite_mangas'],
          [manga],
        );
        break;
      }
      case FAVOURITE_TYPE.AUTHOR: {
        const author = await AuthorDao.getAuthorDetailById(id);
        BaseDao.addElementToFields<AuthorDetailSchema>(
          SCHEMA_NAME.USER,
          USER_ID,
          ['favourite_authors'],
          [author],
        );
        break;
      }
      case FAVOURITE_TYPE.CHARACTER: {
        const char = await CharacterDao.getCharacterDetailById(id);
        BaseDao.addElementToFields(
          SCHEMA_NAME.USER,
          USER_ID,
          ['favourite_characters'],
          [char],
        );
        break;
      }
      default:
        console.error('Repository::setFavourite Invalid favourite type.');
        return;
    }
  }

  async removeFavourite(type: string, id: number) {
    switch (type) {
      case FAVOURITE_TYPE.MANGA: {
        const manga = await MangaDao.getMangaById(id);
        BaseDao.removeElementFromFields(
          SCHEMA_NAME.USER,
          USER_ID,
          ['favourite_mangas'],
          [manga],
        );
        break;
      }
      case FAVOURITE_TYPE.AUTHOR: {
        const author = await AuthorDao.getAuthorDetailById(id);
        BaseDao.removeElementFromFields(
          SCHEMA_NAME.USER,
          USER_ID,
          ['favourite_authors'],
          [author],
        );
        break;
      }
      case FAVOURITE_TYPE.CHARACTER: {
        const char = await CharacterDao.getCharacterDetailById(id);
        BaseDao.removeElementFromFields(
          SCHEMA_NAME.USER,
          USER_ID,
          ['favourite_characters'],
          [char],
        );
        break;
      }
      default:
        console.error('Repository::getFavourites Invalid favourite type.');
        return;
    }
  }

  async getFavourites(
    type: string,
  ): Promise<MangaSchema[] | AuthorDetailSchema[] | CharacterDetailSchema[]> {
    const user = await BaseDao.getObjectById<UserSchema>(
      SCHEMA_NAME.USER,
      USER_ID,
    );
    switch (type) {
      case FAVOURITE_TYPE.MANGA: {
        return user?.favourite_mangas ?? [];
      }
      case FAVOURITE_TYPE.AUTHOR: {
        return user?.favourite_authors ?? [];
      }
      case FAVOURITE_TYPE.CHARACTER: {
        return user?.favourite_characters ?? [];
      }
      default:
        console.error('Repository::getFavourites Invalid favourite type.');
        return [];
    }
  }

  async addSearchRecent(recent: SearchRecentSchema) {
    BaseDao.addElementToFields<MangaSchema>(
      SCHEMA_NAME.USER,
      USER_ID,
      ['search_recent'],
      [recent],
    );
  }

  async removeSearchRecent(recent: SearchRecentSchema) {
    BaseDao.removeElementFromFields(
      SCHEMA_NAME.USER,
      USER_ID,
      ['search_recent'],
      [recent],
    );
  }

  async deleteAllSearchRecent() {
    BaseDao.updateFields(SCHEMA_NAME.USER, USER_ID, ['search_recent'], [[]]);
  }
}

export default new UserDao();
