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
    img: 'string',
    title: 'string',
    author: `${SCHEMA_NAME.AUTHOR_SIMPLE}`,
    genres: `${SCHEMA_NAME.GENRE}[]`,
    rank: 'int?',
    popularity: 'int?',
    members: 'int?',
    characters: `${SCHEMA_NAME.CHARACTER_SIMPLE}[]`,
    score: 'int?',
    scoredBy: 'int?',
    synopsis: 'string',
    chapters: 'int?',
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
    author: `${SCHEMA_NAME.AUTHOR_SIMPLE}`,
  },
};

export interface MangaSchema {
  id: number;
  modify_date: number;
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
  chapters?: number;
}

export interface CoverMangaSchema {
  id: number;
  modify_date: number;
  img: string;
  title: string;
  author: AuthorSchema;
}
