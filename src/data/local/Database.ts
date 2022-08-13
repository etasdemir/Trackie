import Realm from 'realm';

import {UserSchema} from './schema/UserSchema';
import {
  CoverMangaSchema,
  MangaSchema,
  ReadingStatusSchema,
} from './schema/MangaSchema';
import {GenreSchema} from './schema/GenreSchema';
import {CharacterDetaiSchema, CharacterSchema} from './schema/CharacterSchema';
import {AuthorSchema, SocialMediaSchema} from './schema/AuthorSchema';

const DB_PATH = '/db/realm';

class Database {
  private connection: Realm | undefined;

  async getConnection(): Promise<Realm> {
    if (!this.connection) {
      this.connection = await Realm.open({
        path: DB_PATH,
        schema: [
          UserSchema,
          MangaSchema,
          ReadingStatusSchema,
          GenreSchema,
          CoverMangaSchema,
          CharacterSchema,
          CharacterDetaiSchema,
          AuthorSchema,
          SocialMediaSchema,
        ],
      });
    }
    return this.connection;
  }

  close() {
    if (this.connection) {
      this.connection.close();
    }
  }
}

export default new Database();
