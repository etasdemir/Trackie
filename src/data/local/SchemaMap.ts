import {CharacterDetailSchema, CharacterSchema} from './schema/CharacterSchema';
import {CoverMangaSchema, MangaSchema} from './schema/MangaSchema';
import {GenreSchema, SpecialGenreSchema} from './schema/GenreSchema';
import {
  AuthorDetailSchema,
  AuthorSchema,
  SocialMediaSchema,
} from './schema/AuthorSchema';
import {ReadingStatusSchema, UserSchema} from './schema/UserSchema';
import {SCHEMA_NAME} from './SchemaName';

export const NAME_TO_SCHEMA = {
  [SCHEMA_NAME.AUTHOR_DETAIL]: AuthorDetailSchema,
  [SCHEMA_NAME.AUTHOR_SIMPLE]: AuthorSchema,
  [SCHEMA_NAME.CHARACTER_SIMPLE]: CharacterSchema,
  [SCHEMA_NAME.CHARACTER_DETAIL]: CharacterDetailSchema,
  [SCHEMA_NAME.GENRE]: GenreSchema,
  [SCHEMA_NAME.SPECIAL_GENRE]: SpecialGenreSchema,
  [SCHEMA_NAME.COVER_MANGA]: CoverMangaSchema,
  [SCHEMA_NAME.MANGA_DETAIL]: MangaSchema,
  [SCHEMA_NAME.SOCIAL_MEDIA]: SocialMediaSchema,
  [SCHEMA_NAME.READING_STATUS]: ReadingStatusSchema,
  [SCHEMA_NAME.USER]: UserSchema,
};
