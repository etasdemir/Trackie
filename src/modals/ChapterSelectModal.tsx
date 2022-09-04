import React, {useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';

import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {ColorProps} from 'src/shared/Types';
import {ChapterSelectionModalProp} from 'src/navigation/types';
import BaseModal from './BaseModal';
import {updateReadingStatusAction} from 'src/redux/actions/UserActions';

interface ChapterItem {
  item: {
    name: string;
    chapter: number;
  };
  selectedChapter: number;
}

const ITEM_HEIGHT_PX = 25;

function ChapterSelectModal(props: ChapterSelectionModalProp) {
  const {
    navigation,
    route: {
      params: {mangaId, currentChapter, totalChapter},
    },
  } = props;
  const [selectedChapter, setSelectedChapter] = useState(currentChapter);
  const language = useSelector((state: RootState) => state.user.language);
  const dispatch = useAppDispatch();

  const onSuccess = useCallback(() => {
    const isFinished = selectedChapter === totalChapter;
    let payload = {
      mangaId,
      finish_date: 0,
      is_finished: false,
      is_reading: true,
      last_read_page: selectedChapter,
      last_read_time: Date.now(),
    };
    if (isFinished) {
      payload = {
        ...payload,
        ...{
          finish_date: Date.now(),
          is_finished: true,
          is_reading: false,
        },
      };
    }
    dispatch(updateReadingStatusAction(payload));
  }, [dispatch, mangaId, selectedChapter, totalChapter]);

  const onChapterItemClick = useCallback((chapter: number) => {
    setSelectedChapter(chapter);
  }, []);

  const listData = useMemo(() => {
    const data = [];
    for (let i = 0; i <= totalChapter; i += 1) {
      const item: ChapterItem = {
        item: {
          name: language.chapter_name_with_num(i.toString()),
          chapter: i,
        },
        selectedChapter,
      };
      data.push(item);
    }
    return data;
  }, [language, selectedChapter, totalChapter]);

  return (
    <BaseModal
      title={language.chapter_select_title}
      description={language.chapter_select_description}
      onSuccess={onSuccess}
      navigation={navigation}>
      <FlatList
        data={listData}
        renderItem={({item}) => (
          <ChapterListItem
            key={item.item.name}
            item={item.item}
            selectedChapter={item.selectedChapter}
            onPress={onChapterItemClick}
          />
        )}
        initialScrollIndex={currentChapter}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT_PX,
          offset: ITEM_HEIGHT_PX * index,
          index,
        })}
        initialNumToRender={50}
      />
    </BaseModal>
  );
}

const ChapterListItem = React.memo(
  (props: ChapterItem & {onPress: (chapter: number) => void}) => {
    const {item, selectedChapter, onPress} = props;
    const theme = useSelector((state: RootState) => state.user.theme);

    let backgroundColor = theme.primaryLight;
    if (item.chapter === selectedChapter) {
      backgroundColor = theme.primary;
    }

    return (
      <ItemButton
        background={backgroundColor}
        color={theme.primary}
        onPress={() => onPress(item.chapter)}>
        <ItemText color={theme.onView}>{item.name}</ItemText>
      </ItemButton>
    );
  },
  (prevProps, nextProps) =>
    prevProps.selectedChapter === nextProps.selectedChapter,
);

const ItemButton = styled.TouchableOpacity<ColorProps & {background: string}>`
  height: ${ITEM_HEIGHT_PX}px;
  justify-content: center;
  border: 1px solid ${({color}) => color};
  background-color: ${({background}) => background};
  border-radius: 40px;
`;

const ItemText = styled.Text<ColorProps>`
  text-align: center;
  color: ${({color}) => color};
  font-size: 15px;
`;

export default React.memo(ChapterSelectModal);
