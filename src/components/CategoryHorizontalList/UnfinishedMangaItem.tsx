import React from 'react';
import styled from 'styled-components/native';

import {ColorProps, UnfinishedManga} from 'src/shared/Types';
import MangaCoverImage from 'src/components/MangaCoverImage';
import theme from 'src/shared/theme';
import ProgressBar from 'src/components/ProgressBar';

export interface UnfinishedMangaItemProps {
  manga: UnfinishedManga;
}

function UnfinishedMangaItem(props: UnfinishedMangaItemProps) {
  const {
    manga: {id, img, title, currentChapter, totalChapter},
  } = props;
  const progress = parseInt(
    ((currentChapter / totalChapter) * 100).toFixed(0),
    10,
  );

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
        {`${currentChapter}/${totalChapter}`}
      </Name>
      <ProgressBar
        targetProgress={progress}
        style={{
          outerColor: theme.primaryDark,
          progressColor: theme.primary,
        }}
      />
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  width: 120px;
  margin: 4px;
  padding: 0 4px;
`;

const Name = styled.Text<ColorProps>`
  font-size: 15px;
  color: ${({color}) => color};
`;

export default UnfinishedMangaItem;
