import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {FlatList, ImageSourcePropType} from 'react-native';
import {useSelector} from 'react-redux';

import TopBar from 'src/components/TopBar';
import {ColorProps, CoverManga} from 'src/shared/Types';
import SocialMediaIcon from './components/SocialMediaIcon';
import HorizontalMangaItem from 'src/components/HorizontalMangaItem';
import FavouriteIcon from 'src/components/FavouriteIcon';
import {AuthorScreenProp} from 'src/navigation/types';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {getAuthorThunk} from 'src/redux/actions/PeopleActions';
import {FAVOURITE_TYPE} from 'src/shared/Constant';
import {SocialMedia, SocialMediaType} from './components/SocialMediaType';

function AuthorDetailScreen(props: AuthorScreenProp) {
  const {
    route: {
      params: {authorId},
    },
    navigation,
  } = props;
  const theme = useSelector((state: RootState) => state.user.theme);
  const language = useSelector((state: RootState) => state.user.language);
  const author = useSelector(
    (state: RootState) => state.people.authors[authorId],
  );
  const dispatcher = useAppDispatch();

  const onBackPress = useCallback(() => {
    navigation.pop();
  }, [navigation]);

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
    <Container color={theme.background}>
      <HeaderContainer>
        <BackgroundView color={theme.primary} />
        <Header color={theme.primaryLight}>
          <TopBar
            onBackPress={onBackPress}
            RightElement={
              <FavouriteIcon
                color={theme.primary}
                itemId={authorId}
                type={FAVOURITE_TYPE.AUTHOR}
              />
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
        {getSocialMediaIcon(links.facebook, SocialMedia.facebook)}
        {getSocialMediaIcon(links.instagram, SocialMedia.instagram)}
        {getSocialMediaIcon(links.tumblr, SocialMedia.tumblr)}
        {getSocialMediaIcon(links.twitter, SocialMedia.twitter)}
        {getSocialMediaIcon(links.tiktok, SocialMedia.tiktok)}
        {getSocialMediaIcon(links.website, SocialMedia.website)}
      </SocialsContainer>
      <SubContainer>
        <CategoryTitle color={theme.onView}>
          {language.author_bio}
        </CategoryTitle>
        <BioText color={theme.onView}>{author.bio}</BioText>
        <CategoryTitle color={theme.onView}>
          {language.author_works}
        </CategoryTitle>
        <MangaFlatList
          showsHorizontalScrollIndicator={false}
          data={author.works}
          renderItem={({item}) => (
            <HorizontalMangaItem
              key={`${item.id}`}
              manga={item}
              navigation={navigation}
            />
          )}
          horizontal
        />
      </SubContainer>
    </Container>
  );
}

function getSocialMediaIcon(
  link: string | undefined,
  socialMedia: SocialMediaType,
) {
  return link ? (
    <SocialMediaIcon link={link} socialMedia={socialMedia} />
  ) : null;
}

const Container = styled.ScrollView<ColorProps>`
  flex: 1;
  background-color: ${({color}) => color};
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
