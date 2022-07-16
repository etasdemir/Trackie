import React, {useState} from 'react';
import styled from 'styled-components/native';

import language from 'src/shared/language';
import theme from 'src/shared/theme';

interface TextInputProps {
  textColor: string;
  backgroundColor: string;
}

// TODO search automatically every ~1 second and onSubmitSearch, left icon will be search icon and right icon is a clear search text.
// TODO If not focused, right icon is invisible

function SearchInput() {
  const [searchText, setSearchText] = useState<string>('');

  const onSubmitSearch = (text: string) => {
    console.log('searched with text:', text);
  };

  const onChangeText = (text: string) => {
    setSearchText(text);
    console.log('auto search with text:', text);
  };

  return (
    <SearchContainer>
      <LeftIconContainer>
        <LeftIcon />
      </LeftIconContainer>
      <SearchTextInput
        value={searchText}
        onChangeText={onChangeText}
        placeholder={language.getText('search_place_holder')}
        textColor={theme.onView}
        placeholderTextColor={theme.onViewFaint}
        backgroundColor={theme.primaryLight}
        numberOfLines={1}
        multiline={false}
        onSubmitEditing={({nativeEvent: {text}}) => onSubmitSearch(text)}
        returnKeyType={'search'}
      />
      <RightIconContainer>
        <RightIcon />
      </RightIconContainer>
    </SearchContainer>
  );
}

const SearchContainer = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
`;

const LeftIconContainer = styled.View`
  height: 100%;
  padding-left: 12px;
  background-color: ${theme.primaryLight};
  justify-content: center;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const LeftIcon = styled.View`
  height: 32px;
  width: 32px;
  background-color: ${theme.primary};
`;

const RightIconContainer = styled.View`
  height: 100%;
  padding-right: 12px;
  background-color: ${theme.primaryLight};
  justify-content: center;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const RightIcon = styled.View`
  height: 32px;
  width: 32px;
  background-color: ${theme.primary};
`;

const SearchTextInput = styled.TextInput<TextInputProps>`
  flex: 1;
  height: 100%;
  background-color: ${({backgroundColor}) => backgroundColor};
  color: ${({textColor}) => textColor};
  padding-left: 10px;
`;

export default SearchInput;
