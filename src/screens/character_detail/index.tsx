import React from 'react';
import styled from 'styled-components/native';
import {FlatList, ImageSourcePropType} from 'react-native';

import TopBar from 'src/components/TopBar';
import {ColorProps, CharacterDetail} from 'src/shared/Types';
import theme from 'src/shared/theme';
import language from 'src/shared/language';
import FavouriteIcon from 'src/components/FavouriteIcon';
import HorizontalMangaItem from 'src/components/HorizontalMangaItem';

export interface CharacterDetailScreenProps {
  character: CharacterDetail;
}

function CharacterDetailScreen(props: CharacterDetailScreenProps) {
  const {character} = props;
  const imageSource: ImageSourcePropType = {
    uri: character.img,
    height: 400,
    width: 250,
  };

  const onBackPress = () => {};

  const onFavouriteClick = () => {
    console.log(
      'add or remove character from favourites with id:',
      character.id,
    );
  };

  return (
    <Container>
      <TopBar
        onBackPress={onBackPress}
        title={character.name}
        RightElement={
          <FavouriteIcon onPress={onFavouriteClick} color={theme.primary} />
        }
      />
      <ContentContainer>
        <CharacterImage resizeMode="cover" source={imageSource} />
        <BioText color={theme.onView}>{character.about}</BioText>
        <CategoryTitle color={theme.onView}>
          {language.getText('character_appearances')}
        </CategoryTitle>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={character.mangaAppearances}
          renderItem={({item}) => (
            <HorizontalMangaItem key={item.id} manga={item} />
          )}
        />
      </ContentContainer>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
`;

const ContentContainer = styled.View`
  align-items: center;
  padding: 16px;
`;

const CharacterImage = styled.Image`
  border-radius: 150px;
`;

const CategoryTitle = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 24px;
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 10px;
`;

const BioText = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 15px;
  margin: 20px 0;
`;

export default CharacterDetailScreen;
