/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Button} from 'react-native';
import {Svg, G, Text, Image} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export default function Component() {
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{rotateZ: `${rotation.value}deg`}],
      };
  });
  const AnimatedG = Animated.createAnimatedComponent(G);
  const rotate = () => {
      rotation.value = withSpring(rotation.value + 360);
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Svg width="300" height="300">
        <AnimatedG style={animatedStyle}>
          <Image
            preserveAspectRatio="xMidYMid slice"
            // animatedProps={tStyle}
            // opacity="0.5"
            href={require('../assets/learn_from.png')}
          />
          <Text
            fill="none"
            stroke="purple"
            fontSize="20"
            fontWeight="bold"
            x="80"
            y="70"
            textAnchor="middle">
            STROKED TEXT
          </Text>
        </AnimatedG>
      </Svg>
      <Button title="rotate Svg" onPress={rotate} />
    </View>
  );
}
