import Realm from 'realm';

import {
  ReadingStatusSchema,
  SearchRecentSchema,
  UserSchema,
} from './schema/UserSchema';
import {CoverMangaSchema, MangaSchema} from './schema/MangaSchema';
import {GenreSchema, SpecialGenreSchema} from './schema/GenreSchema';
import {CharacterDetailSchema, CharacterSchema} from './schema/CharacterSchema';
import {
  AuthorDetailSchema,
  AuthorSchema,
  SocialMediaSchema,
} from './schema/AuthorSchema';

class Database {
  private connection: Realm | undefined;

  async getConnection(): Promise<Realm> {
    if (!this.connection) {
      this.connection = await Realm.open({
        schema: [
          UserSchema,
          MangaSchema,
          ReadingStatusSchema,
          GenreSchema,
          SpecialGenreSchema,
          CoverMangaSchema,
          CharacterSchema,
          CharacterDetailSchema,
          AuthorDetailSchema,
          AuthorSchema,
          SocialMediaSchema,
          SearchRecentSchema,
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
