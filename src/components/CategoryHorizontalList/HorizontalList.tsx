import React from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import {RootState} from 'src/redux/AppStore';
import {ColorProps, Genre} from 'src/shared/Types';

interface Props {
  genre: Genre;
  ListComponent: () => JSX.Element;
}

function HorizontalList(props: Props) {
  const {genre, ListComponent} = props;
  console.log('Inner horizontal list rendered', genre);
  const theme = useSelector((state: RootState) => state.user.theme);

  return (
    <Container>
      <CategoryHeader>
        <CategoryTitle color={theme.onView}>{genre.name}</CategoryTitle>
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
