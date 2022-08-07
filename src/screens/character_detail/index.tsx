import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {FlatList, ImageSourcePropType} from 'react-native';
import {useSelector} from 'react-redux';

import TopBar from 'src/components/TopBar';
import {ColorProps} from 'src/shared/Types';
import theme from 'src/shared/theme';
import language from 'src/shared/language';
import FavouriteIcon from 'src/components/FavouriteIcon';
import HorizontalMangaItem from 'src/components/HorizontalMangaItem';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {CharacterScreenProp} from 'src/navigation/types';
import {getCharacterThunk} from 'src/redux/actions/PeopleActions';

function CharacterDetailScreen(props: CharacterScreenProp) {
  const {
    navigation,
    route: {
      params: {characterId},
    },
  } = props;
  const dispatcher = useAppDispatch();
  const character = useSelector(
    (state: RootState) => state.people.characters[characterId],
  );
  const [isFavourite, setIsFavourite] = useState(false);

  const onBackPress = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onFavouriteClick = useCallback(() => {
    if (character) {
      setIsFavourite(prev => !prev);
      console.log(
        'add or remove character from favourites with id:',
        character.id,
      );
    }
  }, [character]);

  if (!character) {
    dispatcher(getCharacterThunk(characterId));
    return null;
  }

  const imageSource: ImageSourcePropType = {
    uri: character.img,
    height: 400,
    width: 250,
  };

  return (
    <Container>
      <TopBar
        onBackPress={onBackPress}
        title={character.name}
        RightElement={
          <FavouriteIcon
            onPress={onFavouriteClick}
            color={theme.primary}
            isEnabled={isFavourite}
          />
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
            <HorizontalMangaItem
              key={item.id}
              manga={item}
              navigation={navigation}
            />
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
