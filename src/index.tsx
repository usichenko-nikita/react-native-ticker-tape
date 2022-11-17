import React, { useEffect, memo, FC, ReactNode } from 'react';
import Animated, {
  Easing,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { withPause } from 'react-native-redash';
import {
  LayoutChangeEvent,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

interface TickerProps {
  children: ReactNode;
  msPerPX?: number;
  isPaused?: boolean;
  loop?: boolean;
  repeat?: number;
  isRTL?: boolean;
  appearFromOutOfSide?: boolean;
}

export const Ticker: FC<TickerProps> = memo(
  ({
    children,
    msPerPX = 20,
    isPaused = false,
    loop = true,
    repeat = 1,
    isRTL = false,
    appearFromOutOfSide = false,
  }) => {
    const getDefaultValue = () => {
      if (!appearFromOutOfSide) {
        return 0;
      }
      console.log(width, 'width');
      return isRTL ? -width : width;
    };
    const viewRef = useAnimatedRef<Animated.View>();
    const scrollRef = useAnimatedRef<ScrollView>();
    const paused = useSharedValue(isPaused);
    const { width } = useWindowDimensions();
    const progress = useSharedValue(getDefaultValue());

    useEffect(() => {
      paused.value = isPaused;
    }, [paused, isPaused]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateX: progress.value,
        },
      ],
    }));

    const onLayout = (event: LayoutChangeEvent) => {
      if (isRTL) {
        scrollRef?.current?.scrollToEnd({ animated: false });
      }
      const numberOfReps = loop ? -1 : repeat;
      if (event.nativeEvent.layout.width) {
        const translateXStateABS = Math.abs(-event.nativeEvent.layout.width);
        const direction = isRTL
          ? event.nativeEvent.layout.width
          : -event.nativeEvent.layout.width;
        progress.value = withPause(
          withRepeat(
            withTiming(direction, {
              duration: translateXStateABS * msPerPX,
              easing: Easing.linear,
            }),
            numberOfReps
          ),
          paused
        );
      }
    };

    return (
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        collapsable={false}
        scrollEnabled={false}
      >
        <Animated.View
          ref={viewRef}
          onLayout={onLayout}
          style={[styles.container, animatedStyle]}
        >
          {children}
        </Animated.View>
      </ScrollView>
    );
  }
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
});
