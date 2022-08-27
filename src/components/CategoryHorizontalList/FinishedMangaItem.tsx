import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import {ColorProps} from 'src/shared/Types';
import MangaCoverImage from 'src/components/MangaCoverImage';
import {RootChildScreenProp} from 'src/navigation/types';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {getMangaThunk} from 'src/redux/actions/MangaActions';

export interface FinishedMangaItem {
  mangaId: number;
  navigation: RootChildScreenProp;
}

function FinishedMangaItem(props: FinishedMangaItem) {
  const {mangaId, navigation} = props;
  const theme = useSelector((state: RootState) => state.user.theme);
  const manga = useSelector((state: RootState) => state.mangas.mangas[mangaId]);
  const dispatch = useAppDispatch();

  const onMangaPress = useCallback(() => {
    navigation.navigate('manga_detail', {mangaId});
  }, [mangaId, navigation]);

  if (!manga) {
    dispatch(getMangaThunk(mangaId));
    return null;
  }

  return (
    <Container onPress={onMangaPress}>
      <MangaCoverImage url={manga.img} />
      <Name numberOfLines={1} color={theme.onView}>
        {manga.title}
      </Name>
      <Name numberOfLines={1} color={theme.onViewFaint}>
        {manga.author.name}
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

export default FinishedMangaItem;
