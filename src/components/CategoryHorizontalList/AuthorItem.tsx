import React from 'react';
import styled from 'styled-components/native';
import {ImageSourcePropType} from 'react-native';
import {useSelector} from 'react-redux';

import {AuthorDetail, ColorProps} from 'src/shared/Types';
import {RootState} from 'src/redux/AppStore';

interface AuthorItemProps {
  author: AuthorDetail;
}

function AuthorItem(props: AuthorItemProps) {
  const {author} = props;
  const {theme} = useSelector((state: RootState) => state.user);
  const imageSource: ImageSourcePropType = {
    uri: author.img,
    height: 150,
    width: 100,
  };

  const onAuthorSelect = () => {
    console.log('navigate to author detail with id:', author.id);
  };

  return (
    <Container onPress={onAuthorSelect}>
      <AuthorImage resizeMode="stretch" source={imageSource} />
      <AuthorName color={theme.onView} numberOfLines={1}>
        {author.name}
      </AuthorName>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  padding: 0 4px;
  margin-bottom: 16px;
  width: 120px;
`;

const AuthorImage = styled.Image`
  border-radius: 40px;
`;

const AuthorName = styled.Text<ColorProps>`
  font-size: 15px;
  text-align: center;
  color: ${({color}) => color};
`;

export default AuthorItem;
