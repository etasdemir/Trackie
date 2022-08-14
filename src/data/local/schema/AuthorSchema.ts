import {CoverMangaSchema} from './MangaSchema';
import {SCHEMA_NAME} from '../SchemaName';

export const AuthorSchema = {
  name: SCHEMA_NAME.AUTHOR_SIMPLE,
  primaryKey: 'id',
  properties: {
    id: 'int',
    modify_date: 'int',
    name: 'string',
  },
};

export const AuthorDetailSchema = {
  name: SCHEMA_NAME.AUTHOR_DETAIL,
  primaryKey: 'id',
  properties: {
    id: 'int',
    modify_date: 'int',
    is_favourite: 'bool',
    name: 'string',
    img: 'string',
    bio: 'string',
    birthPlace: 'string?',
    birthDate: 'string',
    works: 'CoverManga[]',
    socialMediaAccounts: 'SocialMedia',
  },
};

export const SocialMediaSchema = {
  name: SCHEMA_NAME.SOCIAL_MEDIA,
  embedded: true,
  properties: {
    facebook: 'string?',
    twitter: 'string?',
    tumblr: 'string?',
    instagram: 'string?',
    tiktok: 'string?',
    website: 'string?',
  },
};

export interface AuthorSchema {
  id: number;
  modify_date: number;
  name: string;
}

export interface AuthorDetailSchema {
  id: number;
  modify_date: number;
  is_favourite: boolean;
  name: string;
  img: string;
  bio: string;
  birthPlace?: string;
  birthDate: string;
  works: Array<CoverMangaSchema>;
  socialMediaAccounts: {
    facebook?: string;
    twitter?: string;
    tumblr?: string;
    instagram?: string;
    tiktok?: string;
    website?: string;
  };
}
