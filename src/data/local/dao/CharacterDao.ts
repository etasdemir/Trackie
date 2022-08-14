import {
  CharacterDetailSchema,
  CharacterSchema,
} from '../schema/CharacterSchema';
import {Character, CharacterDetail} from 'src/shared/Types';
import {CoverMangaSchema} from '../schema/MangaSchema';
import DaoManager from './DaoManager';
import MangaDao from './MangaDao';
import {SCHEMA_NAME} from '../SchemaName';

class CharacterService {
  async getCharacterDetailById(
    id: number,
  ): Promise<CharacterDetailSchema | undefined> {
    return await DaoManager.getObjectById(SCHEMA_NAME.CHARACTER_DETAIL, id);
  }

  async getCharacterDetailsById(
    characterIds: number[],
  ): Promise<CharacterDetailSchema[]> {
    return await DaoManager.getObjectsById(
      SCHEMA_NAME.CHARACTER_DETAIL,
      characterIds,
    );
  }

  async createCharacterDetail(character: CharacterDetail) {
    const mangaIds = character.mangaAppearances.map(item => item.id);
    const mangaAppearances: CoverMangaSchema[] =
      await MangaDao.getCoverMangasById(mangaIds);
    const obj: CharacterDetailSchema = {
      id: character.id,
      modify_date: Date.now(),
      is_favourite: false,
      img: character.img,
      name: character.name,
      about: character.about,
      mangaAppearances,
    };
    DaoManager.createObject(SCHEMA_NAME.CHARACTER_DETAIL, obj);
  }

  async setFavouriteCharacter(isFavourite: boolean, characterId: number) {
    DaoManager.setFavouriteField(
      SCHEMA_NAME.CHARACTER_DETAIL,
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
    return await DaoManager.getObjectById(SCHEMA_NAME.CHARACTER_SIMPLE, id);
  }

  async getCharactersById(characterIds: number[]): Promise<CharacterSchema[]> {
    return await DaoManager.getObjectsById(
      SCHEMA_NAME.CHARACTER_SIMPLE,
      characterIds,
    );
  }

  async createCharacter(character: Character) {
    const obj: CharacterSchema = {
      id: character.id,
      modify_date: Date.now(),
      img: character.img,
      name: character.name,
    };
    DaoManager.createObject(SCHEMA_NAME.CHARACTER_SIMPLE, obj);
  }
}

export default new CharacterService();
