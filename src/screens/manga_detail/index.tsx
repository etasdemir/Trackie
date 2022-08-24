import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {ImageSourcePropType, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

import TopBar from 'src/components/TopBar';
import {ColorProps, Genre} from 'src/shared/Types';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import language from 'src/shared/language';
import FavouriteIcon from 'src/components/FavouriteIcon';
import StarRating from 'src/components/StarRating';
import CategoryChip from './components/CategoryChip';
import {getMangaThunk} from 'src/redux/actions/MangaActions';
import {MangaScreenProp} from 'src/navigation/types';
import {FAVOURITE_TYPE} from 'src/shared/Constant';
import MangaCharacterList from './components/MangaCharacterList';
import {updateReadingStatusAction} from 'src/redux/actions/UserActions';
import {ReadingStatusSchema} from 'src/data/local/schema/UserSchema';

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
  const manga = useSelector((state: RootState) => state.mangas.mangas[mangaId]);
  const readingStatus = useSelector((state: RootState) => {
    let status: ReadingStatusSchema | undefined;
    for (const element of state.user.reading_statuses) {
      if (element.mangaId === mangaId) {
        status = element;
        break;
      }
    }
    return status;
  });

  const onBackPress = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onAuthorClick = useCallback(() => {
    navigation.navigate('author_detail', {authorId: manga.author.id});
  }, [manga?.author.id, navigation]);

  const onFinishedReading = useCallback(() => {
    const status = {
      mangaId,
      is_reading: false,
      is_finished: true,
      finish_date: Date.now(),
      last_read_page: readingStatus?.last_read_page ?? 0,
      last_read_time: readingStatus?.last_read_time ?? 0,
    };
    dispatch(updateReadingStatusAction(status));
  }, [dispatch, mangaId, readingStatus]);

  const onReadingNow = useCallback(() => {
    const currentPage = 5;
    const status = {
      mangaId,
      is_reading: true,
      is_finished: false,
      finish_date: readingStatus?.finish_date ?? 0,
      last_read_page: currentPage,
      last_read_time: Date.now(),
    };
    dispatch(updateReadingStatusAction(status));
  }, [dispatch, mangaId, readingStatus]);

  if (!manga) {
    dispatch(getMangaThunk(mangaId));
    return null;
  }

  const imageSource: ImageSourcePropType = {
    uri: manga.img,
    height: 400,
    width: 250,
  };

  return (
    <Container>
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
        <CategoryChipContainer>
          {manga.genres.map((genre: Genre) => (
            <CategoryChip
              key={genre.id}
              genre={genre}
              navigation={navigation}
            />
          ))}
        </CategoryChipContainer>
        <IconContainer>
          <IconButton onPress={onReadingNow} color={theme.primary} />
          <IconButton onPress={onFinishedReading} color={theme.primary} />
        </IconContainer>
      </Header>
      <SubContainer>
        <RankingContainer>
          {manga.rank && (
            <RankingText color={theme.onViewFaint}>
              {language.getText('manga_ranked', manga.rank.toString())}
            </RankingText>
          )}
          {manga.popularity && (
            <RankingText color={theme.onViewFaint}>
              {language.getText(
                'manga_popularity',
                manga.popularity.toString(),
              )}
            </RankingText>
          )}
          {manga.members && (
            <RankingText color={theme.onViewFaint}>
              {language.getText('manga_members', manga.members.toString())}
            </RankingText>
          )}
        </RankingContainer>
        <CategoryTitle color={theme.onView}>
          {language.getText('manga_synopsis')}
        </CategoryTitle>
        <SynopsisText color={theme.onView}>{manga.synopsis}</SynopsisText>
        <CategoryTitle color={theme.onView}>
          {language.getText('characters')}
        </CategoryTitle>
        <MangaCharacterList mangaId={mangaId} navigation={navigation} />
      </SubContainer>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
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
  margin: 15px 20px 20px 0;
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
`;

const IconContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const IconButton = styled.TouchableOpacity<ColorProps>`
  background-color: ${({color}) => color};
  width: 32px;
  height: 32px;
  margin: 0 60px;
`;

const SubContainer = styled.View`
  padding: 16px;
`;

const RankingContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
`;

const RankingText = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 14px;
`;

const CategoryTitle = styled.Text<ColorProps>`
  color: ${({color}) => color};
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
