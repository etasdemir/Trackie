import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {FlatList, ImageSourcePropType} from 'react-native';
import {useSelector} from 'react-redux';

import TopBar from 'src/components/TopBar';
import {ColorProps, CoverManga} from 'src/shared/Types';
import theme from 'src/shared/theme';
import language from 'src/shared/language';
import SocialMediaIcon, {SocialMedia} from './components/SocialMediaIcon';
import HorizontalMangaItem from 'src/components/HorizontalMangaItem';
import FavouriteIcon from 'src/components/FavouriteIcon';
import {AuthorScreenProp} from 'src/navigation/types';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {getAuthorThunk} from 'src/redux/actions/PeopleActions';

function AuthorDetailScreen(props: AuthorScreenProp) {
  const {
    route: {
      params: {authorId},
    },
    navigation,
  } = props;
  const author = useSelector(
    (state: RootState) => state.people.authors[authorId],
  );
  const dispatcher = useAppDispatch();

  const onBackPress = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onFavouriteClick = useCallback(() => {}, []);

  if (!author) {
    dispatcher(getAuthorThunk(authorId));
    return null;
  }

  const links = author.socialMediaAccounts;
  const imageSource: ImageSourcePropType = {
    uri: author.img,
    height: 400,
    width: 250,
  };

  return (
    <Container>
      <HeaderContainer>
        <BackgroundView color={theme.primary} />
        <Header color={theme.primaryLight}>
          <TopBar
            onBackPress={onBackPress}
            RightElement={
              <FavouriteIcon onPress={onFavouriteClick} color={theme.primary} />
            }
          />
          <AuthorImage resizeMode="cover" source={imageSource} />
          <AuthorName color={theme.onView}>{author.name}</AuthorName>
          {author.birthPlace && (
            <HeaderSubText color={theme.onViewFaint}>
              {author.birthPlace}
            </HeaderSubText>
          )}
          <HeaderSubText color={theme.onViewFaint}>
            {author.birthDate}
          </HeaderSubText>
        </Header>
      </HeaderContainer>
      <SocialsContainer color={theme.primary}>
        {links.facebook && (
          <SocialMediaIcon type={SocialMedia.Facebook} url={links.facebook} />
        )}
        {links.instagram && (
          <SocialMediaIcon type={SocialMedia.Instagram} url={links.instagram} />
        )}
        {links.tumblr && (
          <SocialMediaIcon type={SocialMedia.Tumblr} url={links.tumblr} />
        )}
        {links.twitter && (
          <SocialMediaIcon type={SocialMedia.Twitter} url={links.twitter} />
        )}
        {links.website && (
          <SocialMediaIcon type={SocialMedia.Website} url={links.website} />
        )}
      </SocialsContainer>
      <SubContainer>
        <CategoryTitle color={theme.onView}>
          {language.getText('author_bio')}
        </CategoryTitle>
        <BioText color={theme.onView}>{author.bio}</BioText>
        <CategoryTitle color={theme.onView}>
          {language.getText('author_works')}
        </CategoryTitle>
        <MangaFlatList
          showsHorizontalScrollIndicator={false}
          data={author.works}
          renderItem={({item}) => (
            <HorizontalMangaItem key={`${item.id}`} manga={item} />
          )}
          horizontal
        />
      </SubContainer>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
`;

const HeaderContainer = styled.View`
  height: 620px;
`;

const Header = styled.View<ColorProps>`
  position: absolute;
  width: 100%;
  height: 620px;

  background-color: ${({color}) => color};
  align-items: center;
  padding-bottom: 40px;
  border-bottom-left-radius: 70px;
  border-bottom-right-radius: 70px;
`;

const AuthorImage = styled.Image`
  border-radius: 150px;
`;

const AuthorName = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 24px;
  font-weight: bold;
  margin-top: 15px;
`;

const HeaderSubText = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 18px;
`;

const BackgroundView = styled.View<ColorProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({color}) => color};
  height: 100px;
`;

const SocialsContainer = styled.View<ColorProps>`
  background-color: ${({color}) => color};
  border-bottom-left-radius: 70px;
  border-bottom-right-radius: 70px;

  flex-direction: row;
  justify-content: center;
  padding: 20px 0;
`;

const SubContainer = styled.View`
  padding: 16px;
`;

const CategoryTitle = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 24px;
  font-weight: bold;
`;

const BioText = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 15px;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const MangaFlatList = styled(FlatList<CoverManga>)`
  margin-top: 10px;
  margin-bottom: 20px;
`;

export default AuthorDetailScreen;
