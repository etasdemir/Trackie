import {
  CharacterDetailSchema,
  CharacterSchema,
} from '../schema/CharacterSchema';
import {Character, CharacterDetail} from 'src/shared/Types';
import {CoverMangaSchema} from '../schema/MangaSchema';
import BaseDao from './BaseDao';
import {SCHEMA_NAME} from '../SchemaName';

class CharacterDao {
  async getCharacterDetailById(
    id: number,
  ): Promise<CharacterDetailSchema | undefined> {
    return await BaseDao.getObjectById(SCHEMA_NAME.CHARACTER_DETAIL, id);
  }

  async getCharacterDetailsById(
    characterIds: number[],
  ): Promise<CharacterDetailSchema[]> {
    return await BaseDao.getObjectsById(
      SCHEMA_NAME.CHARACTER_DETAIL,
      characterIds,
    );
  }

  async createCharacterDetail(
    character: CharacterDetail,
    mangaAppearances: CoverMangaSchema[],
  ) {
    const obj: CharacterDetailSchema = {
      id: character.id,
      modify_date: Date.now(),
      img: character.img,
      name: character.name,
      about: character.about,
      mangaAppearances,
    };
    BaseDao.createObject(SCHEMA_NAME.CHARACTER_DETAIL, obj);
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
    return await BaseDao.getObjectById(SCHEMA_NAME.CHARACTER_SIMPLE, id);
  }

  async getCharactersById(characterIds: number[]): Promise<CharacterSchema[]> {
    return await BaseDao.getObjectsById(
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
    BaseDao.createObject(SCHEMA_NAME.CHARACTER_SIMPLE, obj);
  }
}

export default new CharacterDao();
