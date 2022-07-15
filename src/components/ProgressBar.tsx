import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, ViewProps} from 'react-native';
import {ColorProps} from 'src/shared/Types';
import styled from 'styled-components/native';

interface Props {
  targetProgress: number;
  duration?: number;
  style: {
    outerColor: string;
    progressColor: string;
  };
}

function ProgressBar(props: Props) {
  const {targetProgress, duration, style} = props;
  const [progress, setProgress] = useState(0);
  const progressValue = useRef(new Animated.Value(0)).current;

  const loadValue = useCallback(
    (value: number) => {
      let target = value;
      if (value >= 100) {
        target = 100;
      }
      Animated.timing(progressValue, {
        toValue: target,
        duration: duration || 2000,
        useNativeDriver: false,
      }).start();
    },
    [duration, progressValue],
  );

  useEffect(() => {
    progressValue.addListener((state: {value: number}) => {
      setProgress(state.value);
    });
    loadValue(targetProgress);
    return () => {
      progressValue.removeAllListeners();
    };
  }, [loadValue, progressValue, targetProgress]);

  return (
    <ProgressBarView color={style.outerColor}>
      <Progress color={style.progressColor} progress={progress} />
    </ProgressBarView>
  );
}

const ProgressBarView = styled.View<ColorProps>`
  height: 12px;
  flex: 1;
  background-color: ${({color}) => color};
  border-radius: 10px;
`;

interface ProgressProps extends ViewProps, ColorProps {
  progress: number;
}

const Progress = styled(Animated.View)<ProgressProps>`
  position: absolute;
  height: 12px;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: ${({color}) => color};
  width: ${({progress}) => progress}%;
  border-radius: 10px;
`;

export default ProgressBar;
