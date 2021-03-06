import React from 'react';
import styled from 'styled-components/native';

import theme from 'src/shared/theme';
import StarRating from 'src/components/StarRating';
import {CategoryManga, ColorProps} from 'src/shared/Types';
import MangaCoverImage from 'src/components/MangaCoverImage';

export interface VerticalMangaItemProps {
  categoryManga: CategoryManga;
}

function VerticalMangaItem(props: VerticalMangaItemProps) {
  const {
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

  const onMangaClick = () => {
    console.log('navigate to manga detail with id:', id);
  };

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
