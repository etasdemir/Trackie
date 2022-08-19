import {UserSchema} from '../schema/UserSchema';
import {SCHEMA_NAME} from '../SchemaName';
import BaseDao from './BaseDao';

const USER_ID = 1;

class UserDao {
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
}

export default new UserDao();
