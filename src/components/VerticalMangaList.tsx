import React, {useCallback, useMemo} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from 'react-native';

import VerticalMangaItem from 'src/components/VerticalMangaItem';
import {CategoryManga} from 'src/shared/Types';
import {
  BottomBarChildScreenProp,
  RootChildScreenProp,
} from 'src/navigation/types';

export interface VerticalMangaListProps {
  categoryMangaList: CategoryManga[];
  scrollHandlers?: {
    onScrollTop?: () => void;
    onScrollBottom?: () => void;
    onEndReached?: () => void;
  };
  navigation: BottomBarChildScreenProp | RootChildScreenProp;
}

interface ScrollEvents {
  lastEvent: 'none' | 'scrollToBottom' | 'scrollToTop';
  lastEventTime: number;
  lastOffset: {
    x: number;
    y: number;
  };
}

const SCROLL_EVENT_THRESHOLD = 10;
const SCROLL_EVENT_TIME_THRESHOLD = 850;

function VerticalMangaList(props: VerticalMangaListProps) {
  const {categoryMangaList, scrollHandlers, navigation} = props;
  let scrollEvents: ScrollEvents = useMemo(
    () => ({
      lastEvent: 'none',
      lastEventTime: Date.now(),
      lastOffset: {
        x: 0,
        y: 0,
      },
    }),
    [],
  );

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {contentOffset} = event.nativeEvent;
      const currentTime = Date.now();
      if (
        currentTime <
        scrollEvents.lastEventTime + SCROLL_EVENT_TIME_THRESHOLD
      ) {
        scrollEvents.lastOffset.y = contentOffset.y;
        return;
      }

      if (
        contentOffset.y >
        scrollEvents.lastOffset.y + SCROLL_EVENT_THRESHOLD
      ) {
        if (scrollEvents.lastEvent !== 'scrollToBottom') {
          if (scrollHandlers && scrollHandlers.onScrollBottom) {
            scrollHandlers.onScrollBottom();
          }
          scrollEvents.lastEvent = 'scrollToBottom';
          scrollEvents.lastEventTime = currentTime;
        }
      } else if (
        contentOffset.y <
        scrollEvents.lastOffset.y - SCROLL_EVENT_THRESHOLD
      ) {
        if (scrollEvents.lastEvent !== 'scrollToTop') {
          if (scrollHandlers && scrollHandlers.onScrollTop) {
            scrollHandlers.onScrollTop();
          }
          scrollEvents.lastEvent = 'scrollToTop';
          scrollEvents.lastEventTime = currentTime;
        }
      }
      scrollEvents.lastOffset.y = contentOffset.y;
    },
    [scrollEvents, scrollHandlers],
  );

  const decelerationRate = useMemo(
    () => (Platform.OS === 'android' ? 0.85 : 0.96),
    [],
  );

  return (
    <FlatList
      data={categoryMangaList}
      renderItem={({item}) => (
        <VerticalMangaItem
          key={item.id}
          categoryManga={item}
          navigation={navigation}
        />
      )}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      onEndReached={scrollHandlers?.onEndReached}
      disableIntervalMomentum={true}
      decelerationRate={decelerationRate}
    />
  );
}

export default VerticalMangaList;
