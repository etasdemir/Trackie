import React from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import {ColorProps, CoverManga} from 'src/shared/Types';
import MangaCoverImage from 'src/components/MangaCoverImage';
import {
  BottomBarChildScreenProp,
  RootChildScreenProp,
} from 'src/navigation/types';
import {RootState} from 'src/redux/AppStore';

export interface HorizontalMangaItemProps {
  manga: CoverManga;
  navigation: BottomBarChildScreenProp | RootChildScreenProp;
  onPress?: () => void;
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
    onPress,
  } = props;
  const theme = useSelector((state: RootState) => state.user.theme);

  const onMangaPress = () => {
    (navigation as RootChildScreenProp).navigate('manga_detail', {mangaId: id});
    onPress && onPress();
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
