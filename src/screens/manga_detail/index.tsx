import React from 'react';
import styled from 'styled-components/native';
import {FlatList, ImageSourcePropType} from 'react-native';

import TopBar from 'src/components/TopBar';
import {MangaDetail, ColorProps, Genre} from 'src/shared/Types';
import theme from 'src/shared/theme';
import language from 'src/shared/language';
import FavouriteIcon from 'src/components/FavouriteIcon';
import StarRating from 'src/components/StarRating';
import CategoryChip from './components/CategoryChip';
import CharacterItem from './components/CharacterItem';

export interface MangaDetailScreenProps {
  manga: MangaDetail;
}

function MangaDetailScreen(props: MangaDetailScreenProps) {
  const {manga} = props;
  const imageSource: ImageSourcePropType = {
    uri: manga.img,
    height: 400,
    width: 250,
  };

  const onBackPress = () => {};

  const onFavouriteClick = () => {};

  const onAuthorClick = () => {
    console.log('navigate to author detail with id:', manga.author.id);
  };

  const onFinishedReading = () => {
    console.log('finished reading manga:', manga.id);
  };

  const onReadingNow = () => {
    console.log('reading manga:', manga.id);
  };

  return (
    <Container>
      <Header color={theme.primaryLight}>
        <TopBar
          onBackPress={onBackPress}
          RightElement={
            <FavouriteIcon onPress={onFavouriteClick} color={theme.primary} />
          }
        />
        <MangaImage resizeMode="cover" source={imageSource} />
        <MangaName color={theme.onView}>{manga.title}</MangaName>
        <AuthorName onPress={onAuthorClick} color={theme.onViewFaint}>
          {manga.author.name}
        </AuthorName>
        <StarRating score={manga.score / 2} scoredBy={manga.scoredBy} />
        <CategoryChipContainer>
          {manga.genres.map((genre: Genre) => (
            <CategoryChip key={genre.id} genre={genre} />
          ))}
        </CategoryChipContainer>
        <IconContainer>
          <IconButton onPress={onReadingNow} color={theme.primary} />
          <IconButton onPress={onFinishedReading} color={theme.primary} />
        </IconContainer>
      </Header>
      <SubContainer>
        <RankingContainer>
          <RankingText color={theme.onViewFaint}>
            {language.getText('manga_ranked', manga.rank.toString())}
          </RankingText>
          <RankingText color={theme.onViewFaint}>
            {language.getText('manga_popularity', manga.popularity.toString())}
          </RankingText>
          <RankingText color={theme.onViewFaint}>
            {language.getText('manga_members', manga.members.toString())}
          </RankingText>
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
          data={manga.characters}
          renderItem={({item}) => (
            <CharacterItem key={item.id} character={item} />
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
  margin-top: 15px;
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
