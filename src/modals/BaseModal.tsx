import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';

import {RootState} from 'src/redux/AppStore';
import {ColorProps} from 'src/shared/Types';
import {RootChildScreenProp} from 'src/navigation/types';
import {THEME} from 'src/shared/Constant';

interface Props {
  title: string;
  description: string;
  children?: JSX.Element;
  onSuccess?: () => void;
  onCancel?: () => void;
  navigation: RootChildScreenProp;
}

function BaseModal(props: Props) {
  const {title, description, children, onSuccess, onCancel, navigation} = props;
  const theme = useSelector((state: RootState) => state.user.theme);
  const language = useSelector((state: RootState) => state.user.language);
  const themedColor =
    theme.theme === THEME.DARK ? theme.onView : theme.primaryDark;

  const onSuccessCallback = () => {
    navigation.pop();
    onSuccess && onSuccess();
  };
  const onCancelCallback = () => {
    navigation.pop();
    onCancel && onCancel();
  };

  return (
    <Container color={theme.primaryLight}>
      <Title color={themedColor}>{title}</Title>
      <Description color={theme.onView}>{description}</Description>
      {children}
      <ButtonContainer>
        <Button color={themedColor} onPress={onCancelCallback}>
          <ButtonText color={themedColor}>{language.cancel}</ButtonText>
        </Button>
        <Button color={themedColor} onPress={onSuccessCallback}>
          <ButtonText color={themedColor}>{language.done}</ButtonText>
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.View<ColorProps>`
  flex: 1;
  background-color: ${({color}) => color};
  justify-content: center;
  padding: 36px;
`;

const Title = styled.Text<ColorProps>`
  font-size: 20px;
  margin-bottom: 20px;
  color: ${({color}) => color};
`;

const Description = styled.Text<ColorProps>`
  font-size: 16px;
  margin-bottom: 20px;
  color: ${({color}) => color};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 50px;
`;

const Button = styled.TouchableOpacity<ColorProps>`
  justify-content: center;
  align-items: center;
  border: 1px solid ${({color}) => color};
  border-radius: 30px;
  padding: 5px 40px;
  margin: 0 10px;
`;

const ButtonText = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 16px;
`;

export default React.memo(BaseModal);
