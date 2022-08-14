import {CoverMangaSchema} from './MangaSchema';
import {SCHEMA_NAME} from '../SchemaName';

export const CharacterSchema = {
  name: SCHEMA_NAME.CHARACTER_SIMPLE,
  primaryKey: 'id',
  properties: {
    id: 'int',
    modify_date: 'int',
    img: 'string',
    name: 'string',
  },
};

export const CharacterDetailSchema = {
  name: SCHEMA_NAME.CHARACTER_DETAIL,
  primaryKey: 'id',
  properties: {
    id: 'int',
    modify_date: 'int',
    is_favourite: 'bool',
    img: 'string',
    name: 'string',
    about: 'string',
    mangaAppearances: 'CoverManga[]',
  },
};

export interface CharacterSchema {
  id: number;
  modify_date: number;
  img: string;
  name: string;
}

export interface CharacterDetailSchema {
  id: number;
  modify_date: number;
  is_favourite: boolean;
  img: string;
  name: string;
  about: string;
  mangaAppearances: Array<CoverMangaSchema>;
}
