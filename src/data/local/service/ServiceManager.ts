import db from '../Database';

class ServiceManager {
  async getObjectById<T>(schema: string, id: number): Promise<T | undefined> {
    const realm = await db.getConnection();
    const result = realm.objectForPrimaryKey<T>(schema, id);
    if (result) {
      return result;
    } else {
      return undefined;
    }
  }

  async getObjectsById<T extends {id: number}>(
    schema: string,
    ids: number[],
  ): Promise<T[]> {
    const realm = await db.getConnection();
    const objs = realm.objects<T>(schema);
    const result: T[] = [];
    for (let obj of objs) {
      if (ids.includes(obj.id)) {
        result.push(obj);
      }
    }
    return result;
  }

  async getAllObjects<T>(schema: string): Promise<T[]> {
    const realm = await db.getConnection();
    const objects = realm.objects<T>(schema);
    const result: T[] = [];
    for (let obj of objects) {
      result.push(obj);
    }
    return result;
  }

  async createObject<T>(schema: string, obj: T) {
    const realm = await db.getConnection();
    realm.write(() => {
      realm.create(schema, obj, Realm.UpdateMode.Modified);
    });
  }

  async createObjects<T>(schema: string, objects: T[]) {
    const realm = await db.getConnection();
    realm.write(() => {
      for (let obj of objects) {
        realm.create(schema, obj, Realm.UpdateMode.Modified);
      }
    });
  }

  async updateFields<T>(
    schema: string,
    id: number,
    fields: string[],
    values: any[],
  ) {
    const realm = await db.getConnection();
    const obj = realm.objectForPrimaryKey<T>(schema, id);
    realm.write(() => {
      if (obj) {
        for (let i = 0; i < fields.length; i++) {
          (obj as never)[fields[i]] = values[i];
        }
      }
    });
  }

  async setFavouriteField<T extends {is_favourite: boolean}>(
    schema: string,
    id: number,
    isFavourite: boolean,
  ) {
    const realm = await db.getConnection();
    realm.write(() => {
      const obj = realm.objectForPrimaryKey<T>(schema, id);
      if (obj) {
        obj.is_favourite = isFavourite;
      }
    });
  }
}

export default new ServiceManager();
