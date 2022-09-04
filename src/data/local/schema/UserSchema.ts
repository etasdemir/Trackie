import {MangaSchema} from './MangaSchema';
import {SCHEMA_NAME} from '../SchemaName';
import {AuthorDetailSchema} from './AuthorSchema';
import {CharacterDetailSchema} from './CharacterSchema';

export const UserSchema = {
  name: SCHEMA_NAME.USER,
  primaryKey: 'id',
  properties: {
    id: 'int',
    persisted_theme: '{}',
    persisted_language: '{}',
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
    mangaId: 'int',
    is_reading: {type: 'bool', default: false},
    is_finished: {type: 'bool', default: false},
    finish_date: {type: 'int', default: 0},
    last_read_page: {type: 'int', default: 0},
    last_read_time: {type: 'int', default: 0},
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
  persisted_theme: {
    theme: string;
    isDeviceTheme: boolean;
  };
  persisted_language: {
    language: string;
    isDeviceLanguage: boolean;
  };
  is_first_install: boolean;
  reading_statuses: ReadingStatusSchema[];
  favourite_mangas: MangaSchema[];
  favourite_authors: AuthorDetailSchema[];
  favourite_characters: CharacterDetailSchema[];
  search_recent: SearchRecentSchema[];
}

export interface ReadingStatusSchema {
  mangaId: number;
  is_reading: boolean;
  is_finished: boolean;
  finish_date: number;
  last_read_page: number;
  last_read_time: number;
}

export interface SearchRecentSchema {
  searched_item_id: number;
  type: string;
  name: string;
}
