import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {ImageSourcePropType} from 'react-native';
import {useSelector} from 'react-redux';

import {Character, ColorProps} from 'src/shared/Types';
import {RootState} from 'src/redux/AppStore';
import {RootChildScreenProp} from 'src/navigation/types';

interface CharacterItemProps {
  character: Character;
  navigation: RootChildScreenProp;
}

function CharacterItem(props: CharacterItemProps) {
  const {character, navigation} = props;
  const theme = useSelector((state: RootState) => state.user.theme);
  const imageSource: ImageSourcePropType = {
    uri: character.img,
    height: 130,
    width: 90,
  };

  const onCharacterSelect = useCallback(() => {
    navigation.navigate('character_detail', {characterId: character.id});
  }, [character.id, navigation]);

  return (
    <Container onPress={onCharacterSelect}>
      <CharacterImage resizeMode="stretch" source={imageSource} />
      <CharacterName color={theme.onView} numberOfLines={1}>
        {character.name}
      </CharacterName>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  padding: 0 4px;
  margin-bottom: 16px;
  width: 120px;
`;

const CharacterImage = styled.Image`
  border-radius: 40px;
`;

const CharacterName = styled.Text<ColorProps>`
  font-size: 15px;
  text-align: center;
  color: ${({color}) => color};
`;

export default CharacterItem;
