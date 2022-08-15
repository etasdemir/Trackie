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

export interface GenreSchema {
  id: number;
  modify_date: number;
  name: string;
  count: number;
  manga_list: MangaSchema[];
}
