import React from 'react';
import styled from 'styled-components/native';

import {ColorProps} from 'src/shared/Types';
import language from 'src/shared/language';
import theme from 'src/shared/theme';
import MangaCoverImage from 'src/components/MangaCoverImage';
import ProgressBar from 'src/components/ProgressBar';

interface Props {}

function Greeting(props: Props) {
  const {} = props;
  const id = 15;
  const name = 'Mahou Sensei Negima! Mahou Sensei Negima!';
  const url = 'https://cdn.myanimelist.net/images/manga/2/253146l.jpg';
  const date = 'July 30, 2022';
  const progress = 52;

  const onUnfinishedMangaClick = () => {};

  const showAllUnfinishedManga = () => {};

  return (
    <GreetingContainer color={theme.primary}>
      <GreetingTitle color={theme.onView}>
        {language.getText('greeting')}
      </GreetingTitle>
      <UnfinishedMangaContainer color={theme.primaryLight}>
        <UnfinishedMangaTitle color={theme.onView}>
          {language.getText('home_unfinished_manga', date)}
        </UnfinishedMangaTitle>
        <ViewAllButton color={theme.primary} onPress={showAllUnfinishedManga}>
          <TitleText>{language.getText('view_all')}</TitleText>
        </ViewAllButton>
        <UnfinishedManga onPress={onUnfinishedMangaClick}>
          <MangaCoverImage url={url} />
          <MangaInnerContainer>
            <MangaNameText numberOfLines={1}>{name}</MangaNameText>
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
        </UnfinishedManga>
      </UnfinishedMangaContainer>
    </GreetingContainer>
  );
}

const GreetingContainer = styled.View<ColorProps>`
  height: 30%;
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
  top: 30%;
  width: 90%;
  margin-top: 30px;
  padding: 20px 15px 0 15px;
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
  margin-right: auto;
  margin-top: 10px;
`;

const TitleText = styled.Text`
  font-size: 16px;
`;

const UnfinishedManga = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 16px 0;
`;

const MangaInnerContainer = styled.View`
  flex: 1;
  flex-direction: column;
  margin: 0 20px 36px 20px;
`;

const MangaNameText = styled.Text`
  font-size: 16px;
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
