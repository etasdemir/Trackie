import {GenreSchema} from './GenreSchema';
import {AuthorSchema} from './AuthorSchema';
import {CharacterSchema} from './CharacterSchema';
import {SCHEMA_NAME} from '../SchemaName';

export const MangaSchema = {
  name: SCHEMA_NAME.MANGA_DETAIL,
  primaryKey: 'id',
  properties: {
    id: 'int',
    modify_date: 'int',
    is_favourite: 'bool',
    img: 'string',
    title: 'string',
    author: 'Author',
    genres: 'Genre[]',
    rank: 'number',
    popularity: 'number',
    members: 'number',
    characters: 'Character[]',
    score: 'int',
    scoredBy: 'int',
    synopsis: 'string',
    reading_status: 'ReadingStatus?',
  },
};

export const CoverMangaSchema = {
  name: SCHEMA_NAME.COVER_MANGA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    modify_date: 'int',
    img: 'string',
    title: 'string',
    author: 'Author',
  },
};

export const ReadingStatusSchema = {
  name: SCHEMA_NAME.READING_STATUS,
  embedded: true,
  properties: {
    is_reading: 'bool',
    is_finished: 'bool',
    finish_date: 'int?',
    last_read_page: 'int',
    last_read_time: 'int',
  },
};

export interface MangaSchema {
  id: number;
  modify_date: number;
  is_favourite: boolean;
  img: string;
  title: string;
  author: AuthorSchema;
  genres: Array<GenreSchema>;
  rank: number;
  popularity: number;
  members: number;
  characters: Array<CharacterSchema>;
  score: number;
  scoredBy: number;
  synopsis: string;
  reading_status: {
    is_reading: boolean;
    is_finished: boolean;
    finish_date?: number;
    last_read_page: number;
    last_read_time: number;
  };
}

export interface CoverMangaSchema {
  id: number;
  modify_date: number;
  img: string;
  title: string;
  author: AuthorSchema;
}
