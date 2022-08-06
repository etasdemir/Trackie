import React from 'react';
import styled from 'styled-components/native';

import {ColorProps, Genre} from 'src/shared/Types';
import theme from 'src/shared/theme';
import {RootChildScreenProp} from 'src/navigation/types';

export interface CategoryChipProps {
  genre: Genre;
  navigation: RootChildScreenProp;
}

function CategoryChip(props: CategoryChipProps) {
  const {navigation, genre} = props;

  const onCategoryChipClick = () => {
    navigation.navigate('category', {genre});
  };

  return (
    <ChipButton onPress={onCategoryChipClick} color={theme.primary}>
      <ChipName numberOfLines={1} color={theme.onView}>
        {genre.name}
      </ChipName>
    </ChipButton>
  );
}

const ChipButton = styled.TouchableOpacity<ColorProps>`
  align-self: baseline;
  border-radius: 30px;
  border: 2px solid ${({color}) => color};
  padding: 4px 10px;
  margin: 5px;
`;

const ChipName = styled.Text<ColorProps>`
  color: ${({color}) => color};
`;

export default CategoryChip;
