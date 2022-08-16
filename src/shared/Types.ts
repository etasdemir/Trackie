export interface StringToLang {
  [key: string]: String | Function;
}

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

export interface UnfinishedManga extends CoverManga {
  currentChapter: number;
  totalChapter: number;
  lastReadingDate: string;
}

export interface MangaDetail extends CategoryManga {
  genres: Array<Genre>;
  rank: number;
  popularity: number;
  members: number;
  characters: Array<Character>;
  is_favourite?: boolean;
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
  is_favourite?: boolean;
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
  is_favourite?: boolean;
  socialMediaAccounts: {
    facebook?: string;
    twitter?: string;
    tumblr?: string;
    instagram?: string;
    tiktok?: string;
    website?: string;
  };
}
