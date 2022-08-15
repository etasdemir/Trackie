import {MangaSchema} from './MangaSchema';
import {SCHEMA_NAME} from '../SchemaName';

export const GenreSchema = {
  name: SCHEMA_NAME.GENRE,
  primaryKey: 'id',
  properties: {
    id: 'int',
    modify_date: 'int',
    name: 'string',
    count: 'int',
    manga_list: `${SCHEMA_NAME.MANGA_DETAIL}[]`,
  },
};

export const SpecialGenreSchema = {
  name: SCHEMA_NAME.SPECIAL_GENRE,
  primaryKey: 'id',
  properties: {
    id: 'int',
    modify_date: 'int',
    manga_list: `${SCHEMA_NAME.MANGA_DETAIL}[]`,
  },
};

export interface GenreSchema {
  id: number;
  modify_date: number;
  name: string;
  count: number;
  manga_list: MangaSchema[];
}

export interface SpecialGenreSchema {
  id: number;
  modify_date: number;
  manga_list: MangaSchema[];
}
