import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {RootState} from 'src/redux/AppStore';

import {ColorProps, UnfinishedManga} from 'src/shared/Types';
import MangaCoverImage from 'src/components/MangaCoverImage';
import {useSelector} from 'react-redux';
import ProgressBar from 'src/components/ProgressBar';
import {RootChildScreenProp} from 'src/navigation/types';

export interface UnfinishedMangaItemProps {
  manga: UnfinishedManga;
  navigation: RootChildScreenProp;
}

function UnfinishedMangaItem(props: UnfinishedMangaItemProps) {
  const {
    manga: {id, img, title, currentChapter, totalChapter},
    navigation,
  } = props;
  const theme = useSelector((state: RootState) => state.user.theme);
  const progress = parseInt(
    ((currentChapter / totalChapter) * 100).toFixed(0),
    10,
  );

  const onMangaPress = useCallback(() => {
    navigation.navigate('manga_detail', {
      mangaId: id,
    });
  }, [id, navigation]);

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
