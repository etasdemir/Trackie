export interface ColorProps {
  color: string;
}

export interface CoverManga {
  id: number;
  img: string;
  title: string;
  author: Author;
}

export interface CategoryManga extends CoverManga {
  score: number;
  scoredBy: number;
  synopsis: string;
}

export interface MangaDetail extends CategoryManga {
  genres: Array<Genre>;
  rank: number;
  popularity: number;
  members: number;
  chapters?: number;
  characters: Array<Character>;
}

export interface Genre {
  id: number;
  name: string;
  count: number;
}

export interface Character {
  id: number;
  img: string;
  name: string;
}

export interface CharacterDetail extends Character {
  about: string;
  mangaAppearances: Array<CoverManga>;
}

export interface Author {
  id: number;
  name: string;
}

export interface AuthorDetail extends Author {
  img: string;
  bio: string;
  birthPlace?: string;
  birthDate: string;
  works: Array<CoverManga>;
  socialMediaAccounts: {
    facebook?: string;
    twitter?: string;
    tumblr?: string;
    instagram?: string;
    tiktok?: string;
    website?: string;
  };
}
