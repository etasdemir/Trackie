import {
  CharacterDetailSchema,
  CharacterSchema,
} from '../schema/CharacterSchema';
import {Character, CharacterDetail} from 'src/shared/Types';
import {CoverMangaSchema} from '../schema/MangaSchema';
import ServiceManager from './ServiceManager';
import MangaService from './MangaService';

class CharacterService {
  private detailSchema = 'CharacterDetail';
  private simpleSchema = 'Character';

  async getCharacterDetailById(
    id: number,
  ): Promise<CharacterDetailSchema | undefined> {
    return await ServiceManager.getObjectById(this.detailSchema, id);
  }

  async getCharacterDetailsById(
    characterIds: number[],
  ): Promise<CharacterDetailSchema[]> {
    return await ServiceManager.getObjectsById(this.detailSchema, characterIds);
  }

  async createCharacterDetail(character: CharacterDetail) {
    const mangaIds = character.mangaAppearances.map(item => item.id);
    const mangaAppearances: CoverMangaSchema[] =
      await MangaService.getCoverMangasById(mangaIds);
    const obj: CharacterDetailSchema = {
      id: character.id,
      modify_date: Date.now(),
      is_favourite: false,
      img: character.img,
      name: character.name,
      about: character.about,
      mangaAppearances,
    };
    ServiceManager.createObject(this.detailSchema, obj);
  }

  async setFavouriteCharacter(isFavourite: boolean, characterId: number) {
    ServiceManager.setFavouriteField(
      this.detailSchema,
      characterId,
      isFavourite,
    );
  }

  // async updateCharacterDetail(character: CharacterDetail) {
  //   const realm = await db.getConnection();
  //   realm.write(() => {
  //     const obj = realm.objectForPrimaryKey<CharacterDetailSchema>(
  //       'CharacterDetail',
  //       character.id,
  //     );
  //     if (obj) {
  //       obj.about = character.about;
  //       obj.modify_date = Date.now();
  //       obj.img = character.img;
  //       obj.name = character.name;
  //       for (let data of character.mangaAppearances) {
  //         // update cover manga
  //         // for (let objData of obj.mangaAppearances) {
  //         //   if (objData.id === data.id) {
  //         //   }
  //         // }
  //       }
  //     }
  //   });
  // }

  async getCharacterById(id: number): Promise<CharacterSchema | undefined> {
    return await ServiceManager.getObjectById(this.simpleSchema, id);
  }

  async getCharactersById(characterIds: number[]): Promise<CharacterSchema[]> {
    return await ServiceManager.getObjectsById(this.simpleSchema, characterIds);
  }

  async createCharacter(character: Character) {
    const obj: CharacterSchema = {
      id: character.id,
      modify_date: Date.now(),
      img: character.img,
      name: character.name,
    };
    ServiceManager.createObject(this.simpleSchema, obj);
  }
}

export default new CharacterService();
