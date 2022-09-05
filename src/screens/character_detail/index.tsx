import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {FlatList, ImageSourcePropType} from 'react-native';
import {useSelector} from 'react-redux';

import TopBar from 'src/components/TopBar';
import {ColorProps} from 'src/shared/Types';
import FavouriteIcon from 'src/components/FavouriteIcon';
import HorizontalMangaItem from 'src/components/HorizontalMangaItem';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {CharacterScreenProp} from 'src/navigation/types';
import {getCharacterThunk} from 'src/redux/actions/PeopleActions';
import {FAVOURITE_TYPE} from 'src/shared/Constant';

function CharacterDetailScreen(props: CharacterScreenProp) {
  const {
    navigation,
    route: {
      params: {characterId},
    },
  } = props;
  const theme = useSelector((state: RootState) => state.user.theme);
  const language = useSelector((state: RootState) => state.user.language);
  const dispatcher = useAppDispatch();
  const character = useSelector(
    (state: RootState) => state.people.characters[characterId],
  );

  const onBackPress = useCallback(() => {
    navigation.pop();
  }, [navigation]);

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
    <Container color={theme.background}>
      <TopBar
        onBackPress={onBackPress}
        title={character.name}
        RightElement={
          <FavouriteIcon
            color={theme.primary}
            itemId={characterId}
            type={FAVOURITE_TYPE.CHARACTER}
          />
        }
      />
      <ContentContainer>
        <CharacterImage resizeMode="cover" source={imageSource} />
        <BioText color={theme.onView}>{character.about}</BioText>
        <CategoryTitle color={theme.onView}>
          {language.character_appearances}
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

const Container = styled.ScrollView<ColorProps>`
  flex: 1;
  background-color: ${({color}) => color};
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
