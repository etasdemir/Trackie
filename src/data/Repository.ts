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
import CharacterDao from './local/dao/CharacterDao';
import AuthorDao from './local/dao/AuthorDao';
import UserDao from './local/dao/UserDao';
import BaseDao from './local/dao/BaseDao';
import {
  ReadingStatusSchema,
  SearchRecentSchema,
  UserSchema,
} from './local/schema/UserSchema';
import CoverMangaDao from './local/dao/CoverMangaDao';

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
      const genreIds = remoteManga.genres.map(item => item.id);
      const genres = await GenreDao.getGenresById(genreIds);
      MangaDao.createManga(remoteManga, genres);
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
      const mangaIds = remoteChar.mangaAppearances.map(item => item.id);
      const mangaAppearances = await CoverMangaDao.getCoverMangasById(mangaIds);
      if (mangaIds.length !== mangaAppearances.length) {
        mangaIds.forEach(async (mangaId, index) => {
          let isAvailable = false;
          for (const manga of mangaAppearances) {
            if (mangaId === manga.id) {
              isAvailable = true;
            }
          }
          if (!isAvailable) {
            await CoverMangaDao.createCoverManga(
              remoteChar.mangaAppearances[index],
            );
          }
        });
      }
      CharacterDao.createCharacterDetail(remoteChar, mangaAppearances);
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
      const workIds = remoteAuthor.works.map(item => item.id);
      const works = await CoverMangaDao.getCoverMangasById(workIds);
      if (workIds.length !== works.length) {
        workIds.forEach(async (workId, index) => {
          let isAvailable = false;
          for (const work of works) {
            if (workId === work.id) {
              isAvailable = true;
            }
          }
          if (!isAvailable) {
            await CoverMangaDao.createCoverManga(remoteAuthor.works[index]);
          }
        });
      }
      AuthorDao.createAuthorDetail(remoteAuthor, works);
      return remoteAuthor;
    }
  }

  async addFavourite(type: string, id: number) {
    await UserDao.addFavourite(type, id);
  }

  async removeFavourite(type: string, id: number) {
    await UserDao.removeFavourite(type, id);
  }

  async getFavourites(type: string) {
    return await UserDao.getFavourites(type);
  }

  async getUser() {
    return await UserDao.getUser();
  }

  async addSearchRecent(recent: SearchRecentSchema) {
    await UserDao.addSearchRecent(recent);
  }

  async removeSearchRecent(recent: SearchRecentSchema) {
    await UserDao.removeSearchRecent(recent);
  }

  async deleteAllSearchRecent() {
    await UserDao.deleteAllSearchRecent();
  }

  async updateReadingStatus(readingStatus: ReadingStatusSchema) {
    await UserDao.updateReadingStatus(readingStatus);
  }

  async removeFromReadings(readingStatus: ReadingStatusSchema) {
    await UserDao.removeFromReadings(readingStatus);
  }

  async getReadingStatuses() {
    return await UserDao.getReadingStatuses();
  }

  async setIsFirstInstall(value: boolean) {
    return await UserDao.setIsFirstInstall(value);
  }

  async getIsFirstInstall() {
    return await UserDao.getIsFirstInstall();
  }

  async getTheme() {
    return await UserDao.getTheme();
  }

  async setTheme(theme: UserSchema['persisted_theme']) {
    await UserDao.setTheme(theme);
  }

  async getLanguage() {
    return await UserDao.getLanguage();
  }

  async setLanguage(language: UserSchema['persisted_language']) {
    await UserDao.setLanguage(language);
  }

  async clearData() {
    await BaseDao.deleteAll();
  }
}

export default new Repository();
