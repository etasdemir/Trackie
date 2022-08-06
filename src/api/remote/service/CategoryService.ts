import {GenresResponse, GenreResponse} from '../model/GenreModel';
import {Genre, MangaDetail} from 'src/shared/Types';
import RequestGateway, {isError} from '../RequestGateway';
import {genreModelToGenre, mangaModelToMangaDetail} from '../Mappers';

class CategoryService {
  async getGenres(): Promise<Genre[]> {
    const response = await RequestGateway.get<GenresResponse>(
      '/genres/manga?filter=genres',
    );
    if (isError(response)) {
      return [];
    } else {
      const genres: Genre[] = response.result.data.map(item =>
        genreModelToGenre(item),
      );
      genres.sort((a, b) => b.count - a.count);
      return genres;
    }
  }

  async getTopMangaList(page: number): Promise<MangaDetail[]> {
    const endpoint = `/top/manga?page=${page}&type=manga&filter=favorite`;
    return await this.getMangaListByCategoryEndpoint(endpoint);
  }

  async getMostPopularMangaList(page: number): Promise<MangaDetail[]> {
    const endpoint = `/top/manga?page=${page}&type=manga&filter=bypopularity`;
    return await this.getMangaListByCategoryEndpoint(endpoint);
  }

  async getMangaListByCategoryId(
    categoryId: number,
    page: number,
  ): Promise<MangaDetail[]> {
    const endpoint = `/manga?type=manga&genres=${categoryId}&page=${page}`;
    return await this.getMangaListByCategoryEndpoint(endpoint);
  }

  private async getMangaListByCategoryEndpoint(
    endpoint: string,
  ): Promise<MangaDetail[]> {
    const response = await RequestGateway.get<GenreResponse>(endpoint);
    if (isError(response)) {
      return [];
    } else {
      return response.result.data.map(item => mangaModelToMangaDetail(item));
    }
  }
}

export default new CategoryService();
