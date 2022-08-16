import GenreDao from './local/dao/GenreDao';
import MangaDao from './local/dao/MangaDao';
import {
  AuthorDetail,
  Character,
  CharacterDetail,
  Genre,
  MangaDetail,
} from 'src/shared/Types';
import CategoryService from './remote/service/CategoryService';
import MangaService from './remote/service/MangaService';
import PeopleService from './remote/service/PeopleService';
import {FAVOURITE_TYPE} from 'src/shared/Constant';
import CharacterDao from './local/dao/CharacterDao';
import AuthorDao from './local/dao/AuthorDao';

class Repository {
  async getGenres(): Promise<Genre[]> {
    const localGenres = await GenreDao.getGenres();
    if (localGenres && localGenres.length > 0) {
      return localGenres;
    } else {
      const remoteGenres = await CategoryService.getGenres();
      GenreDao.createGenres(remoteGenres);
      return remoteGenres;
    }
  }

  async getMangaListByCategoryId(
    categoryId: number,
    page: number,
  ): Promise<MangaDetail[]> {
    const localMangaList = await GenreDao.getMangaListByGenreId(categoryId);
    if (localMangaList && localMangaList.length > 0) {
      return localMangaList;
    } else {
      const remoteMangaList = await CategoryService.getMangaListByCategoryId(
        categoryId,
        page,
      );
      GenreDao.createGenreMangaList(categoryId, remoteMangaList);
      return remoteMangaList;
    }
  }

  async getTopMangaList(page: number): Promise<MangaDetail[]> {
    const localTopMangas = await GenreDao.getTopMangaList();
    if (localTopMangas && localTopMangas.length > 0) {
      return localTopMangas;
    } else {
      const remoteTopMangas = await CategoryService.getTopMangaList(page);
      GenreDao.createTopMangaList(remoteTopMangas);
      return remoteTopMangas;
    }
  }

  async getMostPopularMangaList(page: number): Promise<MangaDetail[]> {
    const localMostPopulars = await GenreDao.getMostPopulars();
    if (localMostPopulars && localMostPopulars.length > 0) {
      return localMostPopulars;
    } else {
      const remoteMostPopulars = await CategoryService.getMostPopularMangaList(
        page,
      );
      GenreDao.createMostPopulars(remoteMostPopulars);
      return remoteMostPopulars;
    }
  }

  async getMangaById(id: number): Promise<MangaDetail | undefined> {
    const manga = await MangaDao.getMangaById(id);
    if (manga) {
      return manga;
    } else {
      const remoteManga = await MangaService.getMangaById(id);
      if (!remoteManga) {
        return undefined;
      }
      MangaDao.createManga(remoteManga);
      return remoteManga;
    }
  }

  async searchManga(query: string, page: number): Promise<MangaDetail[]> {
    return await MangaService.searchManga(query, page);
  }

  async getMangaCharacters(mangaId: number): Promise<Character[]> {
    const chars = await MangaDao.getMangaCharacters(mangaId);
    if (chars && chars.length > 0) {
      return chars;
    } else {
      const remoteChars = await MangaService.getMangaCharacters(mangaId);
      MangaDao.createMangaCharacters(mangaId, remoteChars);
      return remoteChars;
    }
  }

  async getCharacterDetailById(
    id: number,
  ): Promise<CharacterDetail | undefined> {
    const character = await CharacterDao.getCharacterDetailById(id);
    if (character) {
      return character;
    } else {
      const remoteChar = await PeopleService.getCharacterById(id);
      if (!remoteChar) {
        return undefined;
      }
      CharacterDao.createCharacterDetail(remoteChar);
      return remoteChar;
    }
  }

  async getAuthorDetailById(id: number): Promise<AuthorDetail | undefined> {
    const author = await AuthorDao.getAuthorDetailById(id);
    if (author) {
      return author;
    } else {
      const remoteAuthor = await PeopleService.getAuthorById(id);
      if (!remoteAuthor) {
        return undefined;
      }
      AuthorDao.createAuthorDetail(remoteAuthor);
      return remoteAuthor;
    }
  }

  async setFavourite(type: string, isFavourite: boolean) {
    switch (type) {
      case FAVOURITE_TYPE.MANGA: {
        break;
      }
      case FAVOURITE_TYPE.AUTHOR: {
        break;
      }
      case FAVOURITE_TYPE.CHARACTER: {
        break;
      }
      default:
        return;
    }
  }

  // User actions getFav manga, chars, authors, currently readings, setTheme, setLanguage, clear data.
}

export default new Repository();
