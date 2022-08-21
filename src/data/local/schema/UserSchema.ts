import {MangaSchema} from './MangaSchema';
import {SCHEMA_NAME} from '../SchemaName';
import {AuthorDetailSchema} from './AuthorSchema';
import {CharacterDetailSchema} from './CharacterSchema';

export const UserSchema = {
  name: SCHEMA_NAME.USER,
  primaryKey: 'id',
  properties: {
    id: 'int',
    theme: 'string?',
    language: 'string?',
    is_first_install: {type: 'bool', default: true},
    reading_statuses: `${SCHEMA_NAME.READING_STATUS}[]`,
    favourite_mangas: `${SCHEMA_NAME.MANGA_DETAIL}[]`,
    favourite_authors: `${SCHEMA_NAME.AUTHOR_DETAIL}[]`,
    favourite_characters: `${SCHEMA_NAME.CHARACTER_DETAIL}[]`,
    search_recent: `${SCHEMA_NAME.SEARCH_RECENT}[]`,
  },
};

export const ReadingStatusSchema = {
  name: SCHEMA_NAME.READING_STATUS,
  embedded: true,
  properties: {
    manga: `${SCHEMA_NAME.MANGA_DETAIL}`,
    is_reading: 'bool',
    is_finished: 'bool',
    finish_date: 'int?',
    last_read_page: 'int?',
    last_read_time: 'int?',
  },
};

export const SearchRecentSchema = {
  name: SCHEMA_NAME.SEARCH_RECENT,
  embedded: true,
  properties: {
    searched_item_id: 'int',
    type: 'string',
    name: 'string',
  },
};

export interface UserSchema {
  id?: number;
  modify_date: number;
  theme?: string;
  language?: string;
  is_first_install: boolean;
  reading_statuses: ReadingStatus[];
  favourite_mangas: MangaSchema[];
  favourite_authors: AuthorDetailSchema[];
  favourite_characters: CharacterDetailSchema[];
  search_recent: SearchRecentSchema[];
}

export interface ReadingStatus {
  manga: MangaSchema;
  is_reading: boolean;
  is_finished: boolean;
  finish_date: number | undefined;
  last_read_page: number | undefined;
  last_read_time: number | undefined;
}

export interface SearchRecentSchema {
  searched_item_id: number;
  type: string;
  name: string;
}
