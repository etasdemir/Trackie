import RequestGateway, {isError} from 'src/api/remote/RequestGateway';
import {Character, MangaDetail} from 'src/shared/Types';
import {MangaDetailModel} from 'src/api/remote/model/MangaModel';
import {mangaModelToMangaDetail} from 'src/api/remote/Mappers';
import {GenreResponse} from 'src/api/remote/model/GenreModel';
import {CharacterResponse} from 'src/api/remote/model/CharacterModel';

class MangaService {
  async getMangaById(id: number): Promise<MangaDetail | undefined> {
    const response = await RequestGateway.get<{data: MangaDetailModel}>(
      `/manga/${id}/full`,
    );
    if (isError(response)) {
      return undefined;
    } else {
      return mangaModelToMangaDetail(response.result.data);
    }
  }

  async searchManga(query: string, page: number): Promise<MangaDetail[]> {
    const url = `/manga?type=manga&page=${page}&q=${query}&order_by=members&sort=desc`;
    const response = await RequestGateway.get<GenreResponse>(url);
    if (isError(response)) {
      return [];
    } else {
      return response.result.data.map(item => mangaModelToMangaDetail(item));
    }
  }

  async getMangaCharacters(mangaId: number): Promise<Character[]> {
    const response = await RequestGateway.get<CharacterResponse>(
      `/manga/${mangaId}/characters`,
    );
    if (isError(response)) {
      return [];
    } else {
      return response.result.data.map(item => ({
        id: item.character.mal_id,
        img: item.character.images.jpg.image_url,
        name: item.character.name,
      }));
    }
  }
}

export default new MangaService();
