import GenreDao from './local/dao/GenreDao';
import {
  AuthorDetail,
  CharacterDetail,
  Genre,
  MangaDetail,
} from 'src/shared/Types';
import CategoryService from './remote/service/CategoryService';

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

  async getTopMangaList(page: number): Promise<MangaDetail[]> {}

  async getMostPopularMangaList(page: number): Promise<MangaDetail[]> {}

  async getMangaById(id: number): Promise<MangaDetail | undefined> {}

  async searchManga(query: string, page: number): Promise<MangaDetail[]> {}

  async getMangaCharacters(mangaId: number): Promise<Character[]> {}

  async getCharacterById(id: number): Promise<CharacterDetail | undefined> {}

  async getAuthorById(id: number): Promise<AuthorDetail | undefined> {}
}

export default new Repository();
