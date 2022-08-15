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
    for (const obj of objs) {
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
    for (const obj of objects) {
      result.push(obj);
    }
    return result;
  }

  async getAllObjectsWithFilter<T>(
    schema: string,
    filters: string[],
  ): Promise<T[]> {
    const realm = await db.getConnection();
    const objects = realm.objects<T>(schema);
    const result: T[] = [];
    for (const obj of objects) {
      let newObj = {};
      for (const key in obj) {
        if (!filters.includes(key)) {
          (newObj as any)[key] = (obj as any)[key];
        }
      }
      result.push(newObj as T);
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
      for (const obj of objects) {
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
        fields.forEach((field, index) => {
          (obj as any)[field] = values[index];
        });
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
