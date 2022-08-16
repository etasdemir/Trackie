import React from 'react';
import {ViewProps} from 'react-native';
import {Rating} from 'react-native-ratings';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';

import language from 'src/shared/language';
import {ColorProps} from 'src/shared/Types';
import {RootState} from 'src/redux/AppStore';

export interface StarRatingProps extends ViewProps {
  score: number;
  scoredBy: number;
}

// TODO Probably this star icon background is white and it will need to change with a custom icon. prop: ratingImage={sourceString}

function StarRating(props: StarRatingProps) {
  const {score, scoredBy} = props;
  const {theme} = useSelector((state: RootState) => state.user);

  return (
    <RatingContainer>
      {score && score > 0 ? (
        <Rating
          type="custom"
          ratingCount={5}
          readonly
          imageSize={20}
          fractions={1}
          startingValue={props.score}
          ratingColor={theme.primary}
          ratingBackgroundColor={theme.background}
          style={props.style}
        />
      ) : null}
      {scoredBy && (
        <ReviewText color={theme.onViewFaint}>
          {language.getText('reviews', score.toString(), scoredBy.toString())}
        </ReviewText>
      )}
    </RatingContainer>
  );
}

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

const ReviewText = styled.Text<ColorProps>`
  color: ${({color}) => color};
  font-size: 12px;
  margin-left: 6px;
`;

export default StarRating;
