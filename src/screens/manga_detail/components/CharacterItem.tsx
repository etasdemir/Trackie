import React from 'react';
import styled from 'styled-components/native';
import {ImageSourcePropType} from 'react-native';

import {Character, ColorProps} from 'src/shared/Types';
import theme from 'src/shared/theme';

interface CharacterItemProps {
  character: Character;
}

function CharacterItem(props: CharacterItemProps) {
  const {character} = props;
  const imageSource: ImageSourcePropType = {
    uri: character.img,
    height: 130,
    width: 90,
  };

  const onCharacterSelect = () => {
    console.log('navigate to character detail with id:', character.id);
  };

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
