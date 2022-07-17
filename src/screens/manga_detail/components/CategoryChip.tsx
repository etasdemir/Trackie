import React from 'react';
import styled from 'styled-components/native';

import {ColorProps, Genre} from 'src/shared/Types';
import theme from 'src/shared/theme';

export interface CategoryChipProps {
  genre: Genre;
}

function CategoryChip(props: CategoryChipProps) {
  const {
    genre: {id, name},
  } = props;

  const onCategoryChipClick = () => {
    console.log('navigate to category with id:', id);
  };

  return (
    <ChipButton onPress={onCategoryChipClick} color={theme.primary}>
      <ChipName numberOfLines={1} color={theme.onView}>
        {name}
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
