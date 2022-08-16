import {SCHEMA_NAME} from '../SchemaName';

export const UserSchema = {
  name: SCHEMA_NAME.USER,
  primaryKey: 'id',
  properties: {
    id: 'int',
    theme: 'string?',
    language: 'string?',
    is_first_install: {type: 'bool', default: true},
    reading_count: {type: 'int', default: 0},
    finished_count: {type: 'int', default: 0},
    fav_manga_count: {type: 'int', default: 0},
  },
};

export interface UserSchema {
  modify_date: number;
  theme: string;
  language: string;
  is_first_install: boolean;
  reading_count: number;
  finished_count: number;
  fav_manga_count: number;
}
