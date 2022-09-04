import React, {useCallback, useEffect, useState} from 'react';
import {Keyboard, TextInput} from 'react-native';
import styled from 'styled-components/native';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

import {RootState} from 'src/redux/AppStore';
import {ColorProps} from 'src/shared/Types';

interface Props {
  searchText: (text: string) => void;
  onTextClear: () => void;
  inputRef: React.RefObject<TextInput>;
}

interface LastTextSearch {
  timestamp: number;
  text: string;
}

const MIN_CHAR_TO_SEARCH = 2;
const AUTO_SEARCH_THRESHOLD = 1;

const getSec = () => {
  return Math.ceil(Date.now() / 1000);
};

let lastSearch: LastTextSearch = {timestamp: getSec(), text: ''};

function SearchInput(props: Props) {
  const {searchText, onTextClear, inputRef} = props;
  const theme = useSelector((state: RootState) => state.user.theme);
  const language = useSelector((state: RootState) => state.user.language);
  const [input, setInput] = useState<string>('');
  const isTextTyped = input.length > 0;

  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    });

    return () => {
      hideSubscription.remove();
    };
  }, [inputRef]);

  const textCleared = useCallback(() => {
    onTextClear();
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [inputRef, onTextClear]);

  const onSubmitSearch = useCallback(
    (text: string) => {
      if (text.length >= MIN_CHAR_TO_SEARCH) {
        searchText(text);
      }
    },
    [searchText],
  );

  const onChangeText = useCallback(
    (text: string) => {
      if (text === '') {
        textCleared();
      }
      setInput(text);
      const now = getSec();
      if (
        text.length >= MIN_CHAR_TO_SEARCH &&
        now > lastSearch.timestamp + AUTO_SEARCH_THRESHOLD &&
        text !== lastSearch.text
      ) {
        lastSearch = {timestamp: getSec(), text};
        searchText(text);
      }
    },
    [searchText, textCleared],
  );

  const clearTextBtn = useCallback(() => {
    textCleared();
    setInput('');
  }, [textCleared]);

  return (
    <SearchContainer color={theme.primaryLight}>
      <LeftIconContainer>
        <SearchIcon name="search" color={theme.primaryDark} size={30} />
      </LeftIconContainer>
      <SearchTextInput
        ref={inputRef}
        value={input}
        onChangeText={onChangeText}
        placeholder={language.search_place_holder}
        textColor={theme.onView}
        placeholderTextColor={theme.onViewFaint}
        numberOfLines={1}
        multiline={false}
        onSubmitEditing={({nativeEvent: {text}}) => onSubmitSearch(text)}
        returnKeyType={'search'}
      />
      {isTextTyped && (
        <RightIconContainer onPress={clearTextBtn}>
          <DeleteIcon name="close" color={theme.primaryDark} size={30} />
        </RightIconContainer>
      )}
    </SearchContainer>
  );
}

interface TextInputProps {
  textColor: string;
}

const SearchContainer = styled.View<ColorProps>`
  height: 50px;
  flex-direction: row;
  align-items: center;
  border-radius: 20px;
  background-color: ${({color}) => color};
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
