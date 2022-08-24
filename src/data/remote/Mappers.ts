import {
  Genre,
  Author,
  MangaDetail,
  AuthorDetail,
  CharacterDetail,
} from 'src/shared/Types';
import {GenreModel} from './model/GenreModel';
import {AuthorDetailModel, AuthorModel} from './model/AuthorModel';
import {MangaDetailModel} from './model/MangaModel';
import {CharacterDetailModel} from './model/CharacterModel';

export const genreModelToGenre = (genreModel: GenreModel): Genre => {
  return Object.freeze({
    id: genreModel.mal_id,
    name: genreModel.name,
    count: genreModel.count,
  } as const);
};

export const authorModelToAuthor = (authorModel: AuthorModel): Author => {
  return Object.freeze({
    id: authorModel.mal_id,
    name: authorModel.name,
  } as const);
};

export const mangaModelToMangaDetail = (
  mangaModel: MangaDetailModel,
): MangaDetail => {
  return Object.freeze({
    genres: mangaModel.genres.map((genreModel: GenreModel) =>
      genreModelToGenre(genreModel),
    ),
    rank: mangaModel.rank,
    popularity: mangaModel.popularity,
    members: mangaModel.members,
    characters: [],
    score: mangaModel.score,
    scoredBy: mangaModel.scored_by,
    synopsis: mangaModel.synopsis,
    id: mangaModel.mal_id,
    img: mangaModel.images.jpg.large_image_url,
    title: mangaModel.title,
    chapters: mangaModel.chapters,
    author: authorModelToAuthor(mangaModel.authors[0]),
  });
};

export const authorDetailModelToAuthorDetail = (
  authorDetailModel: AuthorDetailModel,
  bio: string,
  birthPlace: string | undefined,
  socialMediaAccounts: AuthorDetail['socialMediaAccounts'],
): AuthorDetail =>
  Object.freeze({
    img: authorDetailModel.images.jpg.image_url,
    bio,
    birthPlace,
    birthDate: new Date(authorDetailModel.birthday).toDateString(),
    works: authorDetailModel.manga.map(item => ({
      id: item.manga.mal_id,
      img: item.manga.images.jpg.large_image_url,
      title: item.manga.title,
      author: {
        id: authorDetailModel.mal_id,
        name: authorDetailModel.name,
      },
    })),
    socialMediaAccounts,
    id: authorDetailModel.mal_id,
    name: authorDetailModel.name,
  });

export const characterDetailModelToCharacterDetail = (
  character: CharacterDetailModel,
): CharacterDetail =>
  Object.freeze({
    about: character.about,
    mangaAppearances: character.manga.map(item => ({
      id: item.manga.mal_id,
      img: item.manga.images.jpg.large_image_url,
      title: item.manga.title,
      author: {
        id: 1883,
        name: 'Ken Akamatsu',
      },
    })),
    id: character.mal_id,
    img: character.images.jpg.image_url,
    name: character.name,
  });
