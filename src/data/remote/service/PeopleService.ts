import {AuthorDetail, CharacterDetail} from 'src/shared/Types';
import RequestGateway, {isError} from 'src/data/remote/RequestGateway';
import {
  AuthorDetailModel,
  PeopleResponse,
} from 'src/data/remote/model/AuthorModel';
import {
  authorDetailModelToAuthorDetail,
  characterDetailModelToCharacterDetail,
} from 'src/data/remote/Mappers';
import {CharacterDetailResponse} from 'src/data/remote/model/CharacterModel';

class PeopleService {
  async getCharacterById(id: number): Promise<CharacterDetail | undefined> {
    const response = await RequestGateway.get<CharacterDetailResponse>(
      `/characters/${id}/full`,
    );
    if (isError(response)) {
      return undefined;
    } else {
      return characterDetailModelToCharacterDetail(response.result.data);
    }
  }

  async getAuthorById(id: number): Promise<AuthorDetail | undefined> {
    const response = await RequestGateway.get<PeopleResponse>(
      `/people/${id}/full`,
    );
    if (isError(response)) {
      return undefined;
    } else {
      const author = response.result.data;
      const about = this.parseAuthorAbout(author.about);
      if (about === undefined) {
        return undefined;
      } else {
        return authorDetailModelToAuthorDetail(
          author,
          about.bio,
          about.birthPlace,
          about.socialMediaAccounts,
        );
      }
    }
  }

  private parseAuthorAbout(
    about: AuthorDetailModel['about'],
  ): undefined | ParseAbout {
    const parsedAbout = about.split('\n\n');
    if (parsedAbout.length === 0) {
      return undefined;
    }
    let birthPlace: undefined | string;
    let socialMediaAccounts: AuthorDetail['socialMediaAccounts'] = {};
    let bioIndex = {start: 0, end: parsedAbout.length - 1};

    if (
      parsedAbout[0].includes('Birth place: ') ||
      parsedAbout[0].includes('Hometown: ') ||
      parsedAbout[0].includes('Current residence: ') ||
      parsedAbout[0].includes('Height: ') ||
      parsedAbout[0].includes('Blood type: ')
    ) {
      bioIndex.start = 1;
      const firstSection = parsedAbout[0].split('\n');
      for (let str of firstSection) {
        if (
          str.includes('Birth place: ') ||
          str.includes('Hometown: ') ||
          str.includes('Current residence: ')
        ) {
          birthPlace = str.split(': ')[1];
        }
      }
    }

    if (
      parsedAbout[parsedAbout.length - 1].includes('http') ||
      parsedAbout[parsedAbout.length - 1].includes('@')
    ) {
      bioIndex.end -= 1;
      const linkSection = parsedAbout[parsedAbout.length - 1];
      for (let str of linkSection.split('\n')) {
        if (str.includes('http')) {
          socialMediaAccounts.website = str.split(': ')[1];
        } else if (str.includes('@')) {
          const parts = str.split(': @');
          const key = parts[0].toLowerCase();
          const value = parts[1];
          if (key.includes('facebook')) {
            socialMediaAccounts.facebook = value;
          } else if (key.includes('twitter')) {
            socialMediaAccounts.twitter = value;
          } else if (key.includes('tumblr')) {
            socialMediaAccounts.tumblr = value;
          } else if (key.includes('instagram')) {
            socialMediaAccounts.instagram = value;
          } else if (key.includes('tiktok')) {
            socialMediaAccounts.tiktok = value;
          }
        }
      }
    }
    return {
      bio: parsedAbout.slice(bioIndex.start, bioIndex.end + 1).join('\n\n'),
      birthPlace,
      socialMediaAccounts,
    };
  }
}

interface ParseAbout {
  bio: string;
  birthPlace?: string;
  socialMediaAccounts: AuthorDetail['socialMediaAccounts'];
}

export default new PeopleService();
