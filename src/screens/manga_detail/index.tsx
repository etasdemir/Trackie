import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {ImageSourcePropType, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

import TopBar from 'src/components/TopBar';
import {ColorProps, Genre} from 'src/shared/Types';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import FavouriteIcon from 'src/components/FavouriteIcon';
import StarRating from 'src/components/StarRating';
import CategoryChip from './components/CategoryChip';
import {getMangaThunk} from 'src/redux/actions/MangaActions';
import {MangaScreenProp} from 'src/navigation/types';
import {FAVOURITE_TYPE} from 'src/shared/Constant';
import MangaCharacterList from './components/MangaCharacterList';
import ReadingStatusComponent from './components/ReadingStatusComponent';

function MangaDetailScreen(props: MangaScreenProp) {
  console.log('MangaDetailScreen rendered');
  const {
    navigation,
    route: {
      params: {mangaId},
    },
  } = props;
  const dispatch = useAppDispatch();
  const theme = useSelector((state: RootState) => state.user.theme);
  const language = useSelector((state: RootState) => state.user.language);
  const manga = useSelector((state: RootState) => state.mangas.mangas[mangaId]);

  const onBackPress = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onAuthorClick = useCallback(() => {
    navigation.navigate('author_detail', {authorId: manga.author.id});
  }, [manga?.author.id, navigation]);

  if (!manga) {
    dispatch(getMangaThunk(mangaId));
    return null;
  }

  const imageSource: ImageSourcePropType = {
    uri: manga.img,
    height: 350,
    width: 210,
  };

  return (
    <Container color={theme.background}>
      <Header color={theme.primaryLight}>
        <TopBar
          onBackPress={onBackPress}
          RightElement={
            <FavouriteIcon
              color={theme.primary}
              itemId={mangaId}
              type={FAVOURITE_TYPE.MANGA}
            />
          }
        />
        <MangaImage resizeMode="cover" source={imageSource} />
        <MangaName color={theme.onView}>{manga.title}</MangaName>
        <TouchableOpacity onPress={onAuthorClick}>
          <AuthorName color={theme.onViewFaint}>{manga.author.name}</AuthorName>
        </TouchableOpacity>
        <StarRating score={manga.score / 2} scoredBy={manga.scoredBy} />
        <RankingContainer>
          {manga.rank && (
            <RankingText color={theme.onViewFaint}>
              {language.manga_ranked(manga.rank.toString())}
            </RankingText>
          )}
          {manga.popularity && (
            <RankingText color={theme.onViewFaint}>
              {language.manga_popularity(manga.popularity.toString())}
            </RankingText>
          )}
          {manga.members && (
            <RankingText color={theme.onViewFaint}>
              {language.manga_members(manga.members.toString())}
            </RankingText>
          )}
        </RankingContainer>
        <CategoryChipContainer>
          {manga.genres.map((genre: Genre) => (
            <CategoryChip
              key={genre.id}
              genre={genre}
              navigation={navigation}
            />
          ))}
        </CategoryChipContainer>
        {manga.chapters && (
          <ReadingStatusComponent mangaId={mangaId} navigation={navigation} />
        )}
      </Header>
      <SubContainer>
        <CategoryTitle color={theme.onView}>
          {language.manga_synopsis}
        </CategoryTitle>
        <SynopsisText color={theme.onView}>{manga.synopsis}</SynopsisText>
        <CategoryTitle color={theme.onView}>
          {language.characters}
        </CategoryTitle>
        <MangaCharacterList mangaId={mangaId} navigation={navigation} />
      </SubContainer>
    </Container>
  );
}

const Container = styled.ScrollView<ColorProps>`
  flex: 1;
  background-color: ${({color}) => color};
`;

const Header = styled.View<ColorProps>`
  width: 100%;
  align-items: center;
  background-color: ${({color}) => color};
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  padding-bottom: 30px;
`;

const MangaImage = styled.Image`
  border-radius: 50px;
`;

const MangaName = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 24px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 10px;
  text-align: center;
`;

const AuthorName = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 16px;
`;

const CategoryChipContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 20px;
  justify-content: center;
`;

const SubContainer = styled.View`
  padding: 16px;
`;

const RankingContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const RankingText = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 14px;
  margin: 0 10px;
`;

const CategoryTitle = styled.Text<ColorProps>`
  color: ${({color}) => color};
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
`;

const SynopsisText = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export default MangaDetailScreen;
