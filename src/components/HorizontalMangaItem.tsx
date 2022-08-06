import React from 'react';
import styled from 'styled-components/native';

import {ColorProps, CoverManga} from 'src/shared/Types';
import MangaCoverImage from 'src/components/MangaCoverImage';
import theme from 'src/shared/theme';
import {BottomBarChildScreenProp} from 'src/navigation/types';

export interface HorizontalMangaItemProps {
  manga: CoverManga;
  navigation: BottomBarChildScreenProp;
}

function HorizontalMangaItem(props: HorizontalMangaItemProps) {
  const {
    manga: {
      id,
      img,
      title,
      author: {name},
    },
    navigation,
  } = props;

  const onMangaPress = () => {
    navigation.navigate('manga_detail', {mangaId: id});
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
  padding: 0 4px;
  width: 120px;
  margin: 4px;
`;

const Name = styled.Text<ColorProps>`
  font-size: 15px;
  color: ${({color}) => color};
`;

export default HorizontalMangaItem;
