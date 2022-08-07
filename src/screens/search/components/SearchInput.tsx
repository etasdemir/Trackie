import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchIcon from 'react-native-vector-icons/MaterialIcons';

import language from 'src/shared/language';
import theme from 'src/shared/theme';
import {ColorProps} from 'src/shared/Types';

interface TextInputProps {
  textColor: string;
}

// TODO search automatically every ~1 second and onSubmitSearch, left icon will be search icon and right icon is a clear search text.
// TODO If not focused, right icon is invisible

function SearchInput() {
  const [searchText, setSearchText] = useState<string>('');

  const onSubmitSearch = useCallback((text: string) => {
    console.log('searched with text:', text);
  }, []);

  const onChangeText = useCallback((text: string) => {
    setSearchText(text);
    console.log('auto search with text:', text);
  }, []);

  const clearText = useCallback(() => {
    setSearchText('');
  }, []);

  const isInputActive = searchText.length > 0;

  return (
    <SearchContainer color={theme.primaryLight}>
      <LeftIconContainer>
        <SearchIcon name="search" color={theme.primaryDark} size={30} />
      </LeftIconContainer>
      <SearchTextInput
        value={searchText}
        onChangeText={onChangeText}
        placeholder={language.getText('search_place_holder')}
        textColor={theme.onView}
        placeholderTextColor={theme.onViewFaint}
        numberOfLines={1}
        multiline={false}
        onSubmitEditing={({nativeEvent: {text}}) => onSubmitSearch(text)}
        returnKeyType={'search'}
      />
      {isInputActive && (
        <RightIconContainer onPress={clearText}>
          <DeleteIcon name="close" color={theme.primaryDark} size={30} />
        </RightIconContainer>
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.View<ColorProps>`
  height: 50px;
  flex-direction: row;
  align-items: center;
  border-radius: 20px;
  background-color: ${theme.primaryLight};
`;

const LeftIconContainer = styled.View`
  height: 100%;
  padding-left: 12px;
  justify-content: center;
`;

const RightIconContainer = styled.TouchableOpacity`
  height: 100%;
  padding-right: 12px;
  justify-content: center;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const SearchTextInput = styled.TextInput<TextInputProps>`
  flex: 1;
  height: 100%;
  color: ${({textColor}) => textColor};
  padding-left: 10px;
`;

export default SearchInput;
