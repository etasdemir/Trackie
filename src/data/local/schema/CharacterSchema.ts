export const CharacterSchema = {
  name: 'Character',
  primaryKey: 'id',
  properties: {
    id: 'int',
    creation_date: 'int',
    img: 'string',
    name: 'string',
  },
};

export const CharacterDetaiSchema = {
  name: 'CharacterDetail',
  primaryKey: 'id',
  properties: {
    id: 'int',
    creation_date: 'int',
    is_favourite: 'bool',
    img: 'string',
    name: 'string',
    about: 'string',
    mangaAppearances: 'CoverManga[]',
  },
};
