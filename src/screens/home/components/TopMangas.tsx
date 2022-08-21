import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {ColorProps, MangaDetail} from 'src/shared/Types';
import ViewAllButton from 'src/components/ViewAllButton';
import language from 'src/shared/language';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import HorizontalMangaItem from 'src/components/HorizontalMangaItem';
import {topMangasThunk} from 'src/redux/actions/CategoryActions';
import {BottomBarChildScreenProp} from 'src/navigation/types';
import {TOP_MANGA_GENRE_ID} from 'src/shared/Constant';

interface Props {
  navigation: BottomBarChildScreenProp;
}

function TopMangas(props: Props) {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const theme = useSelector((state: RootState) => state.user.theme);
  const topMangas = useSelector((state: RootState) => state.category.topMangas);

  const genre = useMemo(
    () => ({
      id: TOP_MANGA_GENRE_ID,
      name: language.getText('top_mangas'),
      count: topMangas.length,
    }),
    [topMangas.length],
  );

  if (!topMangas || topMangas.length === 0) {
    const page = 1;
    dispatch(topMangasThunk(page));
  }

  const onCategoryViewAllPress = useCallback(() => {
    navigation.navigate('category', {genre});
  }, [genre, navigation]);

  return (
    <Container>
      <CategoryHeader>
        <CategoryTitle color={theme.onView}>{genre.name}</CategoryTitle>
        <ViewAllButton
          onPress={onCategoryViewAllPress}
          text={language.getText('view_all') + ' >'}
        />
      </CategoryHeader>
      <MangaFlatList
        showsHorizontalScrollIndicator={false}
        data={topMangas}
        renderItem={({item}) => (
          <HorizontalMangaItem
            key={item.id.toString()}
            manga={item}
            navigation={navigation}
          />
        )}
        horizontal={true}
      />
    </Container>
  );
}

const Container = styled.View`
  margin: 20px 0;
`;

const CategoryHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const CategoryTitle = styled.Text<ColorProps>`
  font-size: 20px;
  font-weight: bold;
  color: ${({color}) => color};
`;

const MangaFlatList = styled(FlatList<MangaDetail>)`
  margin-top: 5px;
`;

export default TopMangas;
