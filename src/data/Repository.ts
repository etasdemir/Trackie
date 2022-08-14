import {
  AuthorDetail,
  CharacterDetail,
  Genre,
  MangaDetail,
} from 'src/shared/Types';

class Repository {
  async getGenres(): Promise<Genre[]> {}

  async getTopMangaList(page: number): Promise<MangaDetail[]> {}

  async getMostPopularMangaList(page: number): Promise<MangaDetail[]> {}

  async getMangaListByCategoryId(
    categoryId: number,
    page: number,
  ): Promise<MangaDetail[]> {}

  async getMangaById(id: number): Promise<MangaDetail | undefined> {}

  async searchManga(query: string, page: number): Promise<MangaDetail[]> {}

  async getMangaCharacters(mangaId: number): Promise<Character[]> {}

  async getCharacterById(id: number): Promise<CharacterDetail | undefined> {}

  async getAuthorById(id: number): Promise<AuthorDetail | undefined> {}
}

export default new Repository();
