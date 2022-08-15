import GenreDao from './local/dao/GenreDao';
import {
  AuthorDetail,
  CharacterDetail,
  Genre,
  MangaDetail,
} from 'src/shared/Types';
import CategoryService from './remote/service/CategoryService';
import {FAVOURITE_TYPE} from 'src/shared/Constant';

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

  async getMangaById(id: number): Promise<MangaDetail | undefined> {}

  async searchManga(query: string, page: number): Promise<MangaDetail[]> {}

  async getMangaCharacters(mangaId: number): Promise<Character[]> {}

  async getCharacterById(id: number): Promise<CharacterDetail | undefined> {}

  async getAuthorById(id: number): Promise<AuthorDetail | undefined> {}

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
