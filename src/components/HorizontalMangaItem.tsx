import React from 'react';
import styled from 'styled-components/native';

import {ColorProps, CoverManga} from 'src/shared/Types';
import MangaCoverImage from 'src/components/MangaCoverImage';
import theme from 'src/shared/theme';

export interface HorizontalMangaItemProps {
  manga: CoverManga;
}

function HorizontalMangaItem(props: HorizontalMangaItemProps) {
  const {
    manga: {
      id,
      img,
      title,
      author: {name},
    },
  } = props;

  const onMangaPress = () => {
    console.log('navigate to manga detail with id:', id);
  };

  return (
    <Container onPress={onMangaPress}>
      <MangaCoverImage url={img} />
      <Name numberOfLines={1} color={theme.onView}>
        {title}
      </Name>
      <Name numberOfLines={1} color={theme.onViewFaint}>
        {name}
      </Name>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  align-items: center;
  width: 120px;
  margin: 4px;
`;

const Name = styled.Text<ColorProps>`
  font-size: 15px;
  color: ${({color}) => color};
`;

export default HorizontalMangaItem;
