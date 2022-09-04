import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {ColorProps} from 'src/shared/Types';
import styled from 'styled-components/native';
import {
  removeReadingStatusAction,
  updateReadingStatusAction,
} from 'src/redux/actions/UserActions';
import {getMangaThunk} from 'src/redux/actions/MangaActions';
import {RootChildScreenProp} from 'src/navigation/types';

interface Props {
  navigation: RootChildScreenProp;
  mangaId: number;
}

function ReadingStatusComponent(props: Props) {
  const {mangaId, navigation} = props;
  const dispatch = useAppDispatch();

  const theme = useSelector((state: RootState) => state.user.theme);
  const language = useSelector((state: RootState) => state.user.language);
  const status = useSelector((state: RootState) => {
    const filtered = state.user.reading_statuses.filter(
      item => item.mangaId === mangaId,
    );
    return filtered.length === 1 ? filtered[0] : null;
  });
  const manga = useSelector((state: RootState) => state.mangas.mangas[mangaId]);

  const onReadingPress = useCallback(() => {
    if (!status?.is_reading) {
      dispatch(
        updateReadingStatusAction({
          mangaId,
          finish_date: 0,
          is_finished: false,
          is_reading: true,
          last_read_page: 0,
          last_read_time: Date.now(),
        }),
      );
    } else {
      // Show drop down list
      navigation.navigate('chapter_selection_modal', {
        mangaId,
        currentChapter: status.last_read_page,
        totalChapter: manga.chapters!!,
      });
      // Item seçilince lastReadPage = item. if item === chapterCount => finished
    }
  }, [dispatch, manga.chapters, mangaId, navigation, status]);

  const onFinishedPress = useCallback(() => {
    if (!status?.is_finished) {
      dispatch(
        updateReadingStatusAction({
          mangaId,
          finish_date: Date.now(),
          is_finished: true,
          is_reading: false,
          last_read_page: manga.chapters!!,
          last_read_time: Date.now(),
        }),
      );
    }
  }, [dispatch, manga.chapters, mangaId, status]);

  const onDeletePress = useCallback(() => {
    if (status) {
      dispatch(removeReadingStatusAction(status));
    }
  }, [dispatch, status]);

  if (!manga) {
    dispatch(getMangaThunk(mangaId));
    return null;
  }

  const parsedFinishDate = status
    ? new Date(status.finish_date).toLocaleDateString()
    : null;

  return (
    <Container>
      <SectionTitle color={theme.onView}>
        {language.manga_my_reading_status}
      </SectionTitle>
      <ButtonContainer padding={status?.is_finished ? 0 : 40}>
        <ReadingStatusButton color={theme.primary} onPress={onReadingPress}>
          {!status?.is_reading ? (
            <ButtonText color={theme.onView}>
              {language.manga_start_reading}
            </ButtonText>
          ) : (
            <ReadingNowContainer>
              <ButtonText color={theme.onView}>
                {`${status!!.last_read_page} / ${manga.chapters!!}`}
              </ButtonText>
              <DropDownIcon
                name="chevron-down-circle-outline"
                size={24}
                color={theme.primary}
              />
            </ReadingNowContainer>
          )}
        </ReadingStatusButton>
        <Separator color={theme.onViewFaint} />
        <ReadingStatusButton
          color={theme.primary}
          disabled={status?.is_finished}
          onPress={onFinishedPress}>
          {!status?.is_finished ? (
            <ButtonText color={theme.onView}>
              {language.manga_finish_reading}
            </ButtonText>
          ) : (
            <ButtonText color={theme.onView}>
              {parsedFinishDate &&
                language.manga_finished_reading(parsedFinishDate)}
            </ButtonText>
          )}
        </ReadingStatusButton>
        {status?.is_finished || status?.is_reading ? (
          <>
            <Separator color={theme.onViewFaint} />
            <ReadingStatusButton color={theme.primary} onPress={onDeletePress}>
              <Icon name="close" size={24} color={theme.onView} />
            </ReadingStatusButton>
          </>
        ) : null}
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.View``;

const SectionTitle = styled.Text<ColorProps>`
  color: ${({color}) => color};
  margin: 16px 0 12px 30px;
  font-size: 16px;
`;

const ButtonContainer = styled.View<{padding: number}>`
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  padding: ${({padding}) => `0 ${padding}px`};
`;

const Separator = styled.View<ColorProps>`
  width: 1px;
  height: 90%;
  margin: 4px 0;
  background-color: ${({color}) => color};
`;

const ReadingStatusButton = styled.TouchableOpacity<ColorProps>`
  height: 36px;
  border-radius: 30px;
  border: 2px solid ${({color}) => color};
  padding: 4px 10px;
  align-items: center;
  justify-content: center;
`;

const ReadingNowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ButtonText = styled.Text<ColorProps>`
  color: ${({color}) => color};
`;

const DropDownIcon = styled(Icon)`
  margin-left: 10px;
`;

export default ReadingStatusComponent;
