import {MangaSchema} from './MangaSchema';

export const GenreSchema = {
  name: 'Genre',
  primaryKey: 'id',
  properties: {
    id: 'int',
    modify_date: 'int',
    name: 'string',
    count: 'int',
    manga_list: 'Manga[]',
  },
};

export interface GenreSchema {
  id: number;
  modify_date: number;
  name: string;
  count: number;
  manga_list: MangaSchema[];
}
