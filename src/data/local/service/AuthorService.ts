import {AuthorDetailSchema, AuthorSchema} from '../schema/AuthorSchema';
import {Author, AuthorDetail} from 'src/shared/Types';
import {CoverMangaSchema} from '../schema/MangaSchema';
import MangaService from './MangaService';
import ServiceManager from './ServiceManager';

class AuthorService {
  private detailSchema = 'AuthorDetail';
  private simpleSchema = 'Author';

  async getAuthorDetailById(
    id: number,
  ): Promise<AuthorDetailSchema | undefined> {
    return await ServiceManager.getObjectById(this.detailSchema, id);
  }

  async getAuthorDetailsById(
    authorIds: number[],
  ): Promise<AuthorDetailSchema[]> {
    return await ServiceManager.getObjectsById(this.detailSchema, authorIds);
  }

  async createAuthorDetail(author: AuthorDetail) {
    const workIds = author.works.map(item => item.id);
    const works: CoverMangaSchema[] = await MangaService.getCoverMangasById(
      workIds,
    );
    const obj: AuthorDetailSchema = {
      id: author.id,
      modify_date: Date.now(),
      is_favourite: false,
      name: author.name,
      img: author.img,
      bio: author.bio,
      birthDate: author.birthDate,
      birthPlace: author.birthPlace,
      works,
      socialMediaAccounts: {
        facebook: author.socialMediaAccounts.facebook,
        twitter: author.socialMediaAccounts.twitter,
        tumblr: author.socialMediaAccounts.tumblr,
        instagram: author.socialMediaAccounts.instagram,
        tiktok: author.socialMediaAccounts.tiktok,
        website: author.socialMediaAccounts.website,
      },
    };
    ServiceManager.createObject(this.detailSchema, obj);
  }

  async setFavouriteAuthor(isFavourite: boolean, authorId: number) {
    ServiceManager.setFavouriteField(this.detailSchema, authorId, isFavourite);
  }

  async getAuthorById(id: number): Promise<AuthorSchema | undefined> {
    return await ServiceManager.getObjectById(this.simpleSchema, id);
  }

  async getAuthorsById(authorIds: number[]): Promise<AuthorSchema[]> {
    return await ServiceManager.getObjectsById(this.simpleSchema, authorIds);
  }

  async createAuthor(author: Author) {
    const obj: AuthorSchema = {
      id: author.id,
      modify_date: Date.now(),
      name: author.name,
    };
    ServiceManager.createObject(this.simpleSchema, obj);
  }
}

export default new AuthorService();
