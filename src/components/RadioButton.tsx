import React from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import {RootState} from 'src/redux/AppStore';
import {ColorProps} from 'src/shared/Types';
import {THEME} from 'src/shared/Constant';

interface Props {
  name: string;
  isEnabled: boolean;
  onPress?: () => void;
}

function RadioButton(props: Props) {
  const {name, isEnabled, onPress} = props;
  const theme = useSelector((state: RootState) => state.user.theme);
  const themedColor = theme.theme === THEME.DARK ? theme.onView : theme.primary;

  return (
    <RadioButtonView onPress={onPress}>
      <RadioOuterCircle color={themedColor}>
        {isEnabled ? <RadioInnerCircle color={themedColor} /> : null}
      </RadioOuterCircle>
      <RadioText color={theme.onView}>{name}</RadioText>
    </RadioButtonView>
  );
}

const RadioButtonView = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 6px 0;
`;

const RadioOuterCircle = styled.View<ColorProps>`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  border: 2px ${({color}) => color} solid;
`;

const RadioInnerCircle = styled.View<ColorProps>`
  height: 12px;
  width: 12px;
  border-radius: 7px;
  background-color: ${({color}) => color};
`;

const RadioText = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 16px;
  margin-left: 8px;
`;

export default RadioButton;
