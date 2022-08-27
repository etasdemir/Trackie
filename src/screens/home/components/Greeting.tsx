import React from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import {ColorProps} from 'src/shared/Types';
import language from 'src/shared/language';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import MangaCoverImage from 'src/components/MangaCoverImage';
import ProgressBar from 'src/components/ProgressBar';
import {BottomBarChildScreenProp} from 'src/navigation/types';
import {getMangaThunk} from 'src/redux/actions/MangaActions';

interface Props {
  navigation: BottomBarChildScreenProp;
}

function Greeting(props: Props) {
  const {navigation} = props;
  const theme = useSelector((state: RootState) => state.user.theme);
  const status = useSelector((state: RootState) => {
    const filtered = state.user.reading_statuses.filter(
      item => item.is_reading && !item.is_finished,
    );
    return filtered.length === 0 ? null : filtered[0];
  });
  const manga = useSelector((state: RootState) =>
    status ? state.mangas.mangas[status.mangaId] : null,
  );
  const dispatch = useAppDispatch();

  if (!status || (manga && !manga.chapters)) {
    return null;
  }
  if (!manga) {
    dispatch(getMangaThunk(status.mangaId));
    return null;
  }

  const progress = parseInt(
    ((status.last_read_page / manga.chapters!!) * 100).toFixed(0),
    10,
  );
  const fullDate = new Date(status.last_read_time);
  const utcDate = fullDate.toUTCString();
  const parsedDate = utcDate.substring(0, utcDate.length - 13);

  const onUnfinishedMangaClick = () => {
    navigation.navigate('manga_detail', {mangaId: status.mangaId});
  };

  const showAllUnfinishedManga = () => {
    console.log('navigate to unfinished manga category');
  };

  return (
    <Container>
      <GreetingContainer color={theme.primary}>
        <GreetingTitle color={theme.onView}>
          {language.getText('greeting')}
        </GreetingTitle>
        <UnfinishedMangaContainer color={theme.primaryLight}>
          <UnfinishedMangaTitle color={theme.onView}>
            {language.getText('home_unfinished_manga', parsedDate)}
          </UnfinishedMangaTitle>
          <ViewAllButton color={theme.primary} onPress={showAllUnfinishedManga}>
            <TitleText>{language.getText('view_all')}</TitleText>
          </ViewAllButton>
          <UnfinishedMangaView onPress={onUnfinishedMangaClick}>
            <MangaCoverImage url={manga.img} />
            <MangaInnerContainer>
              <MangaNameText color={theme.onView} numberOfLines={1}>
                {manga.title}
              </MangaNameText>
              <ProgressBarContainer>
                <ProgressBar
                  targetProgress={progress}
                  style={{
                    outerColor: theme.primaryDark,
                    progressColor: theme.primary,
                  }}
                />
                <ProgressText
                  color={theme.onViewFaint}>{`${progress}%`}</ProgressText>
              </ProgressBarContainer>
            </MangaInnerContainer>
          </UnfinishedMangaView>
        </UnfinishedMangaContainer>
      </GreetingContainer>
    </Container>
  );
}

const Container = styled.View`
  height: 370px;
`;

const GreetingContainer = styled.View<ColorProps>`
  height: 50%;
  background-color: ${({color}) => color};
  align-items: center;
  border-radius: 40px;
`;

const GreetingTitle = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 15px;
  text-align: center;
  padding: 0 10%;
  margin: 20px;
`;

const UnfinishedMangaContainer = styled.View<ColorProps>`
  position: absolute;
  width: 90%;
  margin-top: 80px;
  padding: 15px 30px 10px 30px;
  background-color: ${({color}) => color};
  border-radius: 40px;
`;

const UnfinishedMangaTitle = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 15px;
  text-align: center;
`;

const ViewAllButton = styled.TouchableOpacity<ColorProps>`
  color: ${({color}) => color};
  border-color: ${({color}) => color};
  border-bottom-width: 2px;
  margin-top: 10px;
  margin-left: auto;
`;

const TitleText = styled.Text`
  font-size: 16px;
`;

const UnfinishedMangaView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const MangaInnerContainer = styled.View`
  flex: 1;
  flex-direction: column;
  margin-bottom: 36px;
  margin-left: 15px;
`;

const MangaNameText = styled.Text<ColorProps>`
  font-size: 16px;
  color: ${({color}) => color};
`;

const ProgressBarContainer = styled.View`
  align-items: center;
  flex-direction: row;
  margin: 10px 0;
`;

const ProgressText = styled.Text<ColorProps>`
  margin-left: 10px;
`;

export default Greeting;
