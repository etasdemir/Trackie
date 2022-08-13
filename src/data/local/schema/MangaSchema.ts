export const MangaSchema = {
  name: 'Manga',
  primaryKey: 'id',
  properties: {
    id: 'int',
    creation_date: 'int',
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
  name: 'CoverManga',
  primaryKey: 'id',
  properties: {
    id: 'int',
    creation_date: 'int',
    img: 'string',
    title: 'string',
    author: 'Author',
  },
};

export const ReadingStatusSchema = {
  name: 'ReadingStatus',
  embedded: true,
  properties: {
    is_finished: 'bool',
    finish_date: 'int?',
    last_read_page: 'int',
    last_read_time: 'int',
  },
};
