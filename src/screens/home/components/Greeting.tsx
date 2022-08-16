import React from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import {ColorProps, UnfinishedManga} from 'src/shared/Types';
import language from 'src/shared/language';
import {RootState} from 'src/redux/AppStore';
import MangaCoverImage from 'src/components/MangaCoverImage';
import ProgressBar from 'src/components/ProgressBar';

interface Props {
  unfinishedManga: UnfinishedManga;
}

function Greeting(props: Props) {
  const {
    unfinishedManga: {
      id,
      title,
      currentChapter,
      totalChapter,
      lastReadingDate,
      img,
    },
  } = props;
  const {theme} = useSelector((state: RootState) => state.user);
  const progress = parseInt(
    ((currentChapter / totalChapter) * 100).toFixed(0),
    10,
  );

  const onUnfinishedMangaClick = () => {
    console.log('navigate to manga detail with id:', id);
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
            {language.getText('home_unfinished_manga', lastReadingDate)}
          </UnfinishedMangaTitle>
          <ViewAllButton color={theme.primary} onPress={showAllUnfinishedManga}>
            <TitleText>{language.getText('view_all')}</TitleText>
          </ViewAllButton>
          <UnfinishedMangaView onPress={onUnfinishedMangaClick}>
            <MangaCoverImage url={img} />
            <MangaInnerContainer>
              <MangaNameText color={theme.onView} numberOfLines={1}>
                {title}
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
