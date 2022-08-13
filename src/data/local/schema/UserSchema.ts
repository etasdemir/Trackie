export const UserSchema = {
  name: 'User',
  properties: {
    creation_date: 'int',
    theme: 'string',
    language: 'string',
    is_first_install: 'bool',
    reading_count: {type: 'int', default: 0},
    finished_count: {type: 'int', default: 0},
    fav_manga_count: {type: 'int', default: 0},
  },
};
