import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import {RootState} from 'src/redux/AppStore';
import StarRating from 'src/components/StarRating';
import {CategoryManga, ColorProps} from 'src/shared/Types';
import MangaCoverImage from 'src/components/MangaCoverImage';
import {
  BottomBarChildScreenProp,
  RootChildScreenProp,
} from 'src/navigation/types';

export interface VerticalMangaItemProps {
  categoryManga: CategoryManga;
  navigation: BottomBarChildScreenProp | RootChildScreenProp;
  onPress?: (name: string, id: number) => void;
}

function VerticalMangaItem(props: VerticalMangaItemProps) {
  const {
    onPress,
    navigation,
    categoryManga: {
      id,
      img,
      title,
      author: {name},
      synopsis,
      score,
      scoredBy,
    },
  } = props;
  const theme = useSelector((state: RootState) => state.user.theme);

  const onMangaClick = useCallback(() => {
    (navigation as RootChildScreenProp).navigate('manga_detail', {mangaId: id});
    onPress && onPress(title, id);
  }, [id, navigation, onPress, title]);

  return (
    <MangaButton onPress={onMangaClick}>
      <MangaCoverImage url={img} />
      <MangaInfoContainer>
        <MangaText color={theme.onView} numberOfLines={1}>
          {title}
        </MangaText>
        <MangaText color={theme.onViewFaint} numberOfLines={1}>
          {name}
        </MangaText>
        <Synopsis color={theme.onView} numberOfLines={3}>
          {synopsis}
        </Synopsis>
        <StarRating score={score / 2} scoredBy={scoredBy} />
      </MangaInfoContainer>
    </MangaButton>
  );
}

const MangaButton = styled.TouchableOpacity`
  flex-direction: row;
  padding: 0 16px;
  margin: 12px 0;
`;

const MangaInfoContainer = styled.View`
  flex: 1;
  padding-left: 12px;
  padding-top: 8px;
  align-items: flex-start;
`;

const MangaText = styled.Text<ColorProps>`
  font-size: 14px;
  color: ${({color}) => color};
`;

const Synopsis = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 13px;
  margin-top: 12px;
`;

export default VerticalMangaItem;
