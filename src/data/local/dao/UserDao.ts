import {CharacterDetailSchema} from '../schema/CharacterSchema';
import {AuthorDetailSchema} from '../schema/AuthorSchema';
import {
  ReadingStatusSchema,
  SearchRecentSchema,
  UserSchema,
} from '../schema/UserSchema';
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
        persisted_theme: {
          theme: '',
          isDeviceTheme: true,
        },
        persisted_language: {
          language: '',
          isDeviceLanguage: true,
        },
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

  async setTheme(theme: UserSchema['persisted_theme']) {
    await BaseDao.updateDictionaries(
      SCHEMA_NAME.USER,
      USER_ID,
      ['persisted_theme'],
      [theme],
    );
  }

  async getTheme(): Promise<UserSchema['persisted_theme'] | undefined> {
    const user = await BaseDao.getObjectById<UserSchema>(
      SCHEMA_NAME.USER,
      USER_ID,
    );
    return user?.persisted_theme;
  }

  async setLanguage(language: UserSchema['persisted_language']) {
    await BaseDao.updateDictionaries(
      SCHEMA_NAME.USER,
      USER_ID,
      ['persisted_language'],
      [language],
    );
  }

  async getLanguage(): Promise<UserSchema['persisted_language'] | undefined> {
    const user = await BaseDao.getObjectById<UserSchema>(
      SCHEMA_NAME.USER,
      USER_ID,
    );
    return user?.persisted_language;
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
    await BaseDao.addElementToFields<MangaSchema>(
      SCHEMA_NAME.USER,
      USER_ID,
      ['search_recent'],
      [recent],
    );
  }

  async removeSearchRecent(recent: SearchRecentSchema) {
    await BaseDao.removeElementFromFields(
      SCHEMA_NAME.USER,
      USER_ID,
      ['search_recent'],
      [recent],
    );
  }

  async deleteAllSearchRecent() {
    await BaseDao.updateFields(
      SCHEMA_NAME.USER,
      USER_ID,
      ['search_recent'],
      [[]],
    );
  }

  async updateReadingStatus(readingStatus: ReadingStatusSchema) {
    await BaseDao.addElementToFields(
      SCHEMA_NAME.USER,
      USER_ID,
      ['reading_statuses'],
      [readingStatus],
    );
  }

  async removeFromReadings(readingStatus: ReadingStatusSchema) {
    await BaseDao.removeElementFromFields(
      SCHEMA_NAME.USER,
      USER_ID,
      ['reading_statuses'],
      [readingStatus],
    );
  }

  async getReadingStatuses() {
    const user = await this.getUser();
    if (user) {
      const statuses = Array.from(user.reading_statuses);
      return readingStatusesSort(statuses);
    } else {
      return [];
    }
  }
}

export const readingStatusesSort = (statuses: ReadingStatusSchema[]) => {
  return statuses.sort((a, b) => {
    if (a.last_read_time !== undefined && b.last_read_time !== undefined) {
      return b.last_read_time - a.last_read_time;
    } else if (
      a.last_read_time !== undefined &&
      b.last_read_time === undefined
    ) {
      return -1;
    } else if (
      a.last_read_time === undefined &&
      b.last_read_time !== undefined
    ) {
      return 1;
    } else {
      return 0;
    }
  });
};

export default new UserDao();
