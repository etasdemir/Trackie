export const AuthorSchema = {
  name: 'Author',
  primaryKey: 'id',
  properties: {
    id: 'int',
    creation_date: 'int',
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
  name: 'SocialMedia',
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
