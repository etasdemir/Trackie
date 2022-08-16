import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {FlatList, ImageSourcePropType, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

import TopBar from 'src/components/TopBar';
import {ColorProps, Genre} from 'src/shared/Types';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import language from 'src/shared/language';
import FavouriteIcon from 'src/components/FavouriteIcon';
import StarRating from 'src/components/StarRating';
import CategoryChip from './components/CategoryChip';
import CharacterItem from './components/CharacterItem';
import {
  getMangaCharactersThunk,
  getMangaThunk,
  setFavouriteMangaAction,
} from 'src/redux/actions/MangaActions';
import {MangaScreenProp} from 'src/navigation/types';

function MangaDetailScreen(props: MangaScreenProp) {
  const {
    navigation,
    route: {
      params: {mangaId},
    },
  } = props;
  const dispatch = useAppDispatch();
  const {theme} = useSelector((state: RootState) => state.user);
  const {characters, manga} = useSelector((state: RootState) => ({
    manga: state.mangas.mangas[mangaId],
    characters: state.mangas.mangaCharacters[mangaId],
  }));

  const onBackPress = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onFavouriteClick = useCallback(() => {
    const id = manga.id;
    dispatch(setFavouriteMangaAction({id, isFavourite: !manga.is_favourite}));
  }, [dispatch, manga]);

  const onAuthorClick = useCallback(() => {
    navigation.navigate('author_detail', {authorId: manga.author.id});
  }, [manga?.author.id, navigation]);

  const onFinishedReading = useCallback(() => {
    console.log('finished reading manga:', manga.id);
  }, [manga?.id]);

  const onReadingNow = useCallback(() => {
    console.log('reading manga:', manga.id);
  }, [manga?.id]);

  if (!manga) {
    dispatch(getMangaThunk(mangaId));
    return null;
  }
  if (!characters) {
    dispatch(getMangaCharactersThunk(mangaId));
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
              onPress={onFavouriteClick}
              color={theme.primary}
              isEnabled={manga.is_favourite ?? false}
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
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={characters}
          renderItem={({item}) => (
            <CharacterItem
              key={item.id}
              character={item}
              navigation={navigation}
            />
          )}
        />
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
