import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import {RootState} from 'src/redux/AppStore';
import {ColorProps, Genre} from 'src/shared/Types';
import ViewAllButton from 'src/components/ViewAllButton';
import language from 'src/shared/language';
import {RootChildScreenProp} from 'src/navigation/types';

interface Props {
  genre: Genre;
  navigation: RootChildScreenProp;
  ListComponent: () => JSX.Element;
}

function HorizontalList(props: Props) {
  const {genre, ListComponent, navigation} = props;
  console.log('Inner horizontal list rendered', genre);
  const theme = useSelector((state: RootState) => state.user.theme);

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
      <ListComponent />
    </Container>
  );
}

const Container = styled.View`
  margin: 20px 0;
`;

const CategoryHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const CategoryTitle = styled.Text<ColorProps>`
  font-size: 20px;
  font-weight: bold;
  color: ${({color}) => color};
`;

export default HorizontalList;
