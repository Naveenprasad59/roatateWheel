import React from 'react';
import Wheel from './src/wheel';
// import {View}
import {useSpring, animated, config} from '@react-spring/native';
import {View, Button, Text} from 'react-native';
// import LearnFrom from './assets/learn_from.png';
import * as d3 from 'd3';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedProps,
} from 'react-native-reanimated';
import Component from './src/Component';

export default function App() {
  const data = [
    {
      value: 20,
      text1: 'Upskill and Deepen',
      text2: 'Your Expertise',
      // ImageSource: LearnFrom,
    },
    {
      value: 20,
      text1: 'Connect with ',
      text2: 'peers and mentors',
      // ImageSource: LearnFrom,
    },
    {
      value: 20,
      text1: 'Identify Your ',
      text2: 'Strength',
      // ImageSource: LearnFrom,
    },
    {
      value: 20,
      text1: 'Pick a Career',
      text2: 'Goal',
      // ImageSource: LearnFrom,
    },
    {
      value: 20,
      text1: 'Find Your Best',
      text2: 'Job Matches',
      // ImageSource: LearnFrom,
    },
  ];
  const [wheelData, setWheelData] = React.useState(data);
  // const [show, updateShow] = React.useState(true);
  // const [flip, set] = React.useState(false);
  const [degree, setDegree] = React.useState(0);
  const [currentIndex, setCurrentIndex] = React.useState(2);
  // const currentIndex = useSharedValue(2);
  const rotateLeft = () => {
    // const arr = [1,2,3,4,5]
    // setWheelData(prev => {
    //   const newData = prev;
    //   newData.unshift(newData.pop());
    //   return newData;
    // });
    // api.start({
    //   x: degree + 30,
    // });
    setCurrentIndex((currentIndex - 1 + 5) % 5);
    // currentIndex.value = withTiming((currentIndex.value - 1 + 5) % 5);
    rotation.value = withTiming(degree + 72, {duration: 2000});
    textRotation.value = withTiming(textRotation.value - 72, {duration: 5000});
    setDegree(degree + 72);
    // setWheelData(generateData());
    // arr.unshift(arr.pop());
    // updateShow(!show);
    console.log('rotate');
    // console.log('textRotation', textRotation.value);
    console.log('degree', degree);
  };
  const rotation = useSharedValue(0);
  const textRotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });
  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      // transform: `translate(0, 0) rotate(0)`,
      transform: [{rotateZ: `${0}deg`}],
    };
  });
  // const textStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{rotateZ: `${360 - rotation.value}deg`}],
  //   };
  // })
  // console.log(props.opacity);
  return (
    <View style={{flex: 1}}>
      <Wheel
        wheelData={wheelData}
        onRotate={rotateLeft}
        width={500}
        height={500}
        innerRadius={60}
        outerRadius={250}
        astyle={animatedStyle}
        currentIndex={currentIndex}
        // tStyle={textAnimationStyle}
        // textstyle={textStyle}
      />
      {/* {show && <Text>{wheelData[0].text}</Text>} */}
      {/* <AnimatedText style={props}>YAhoooooooooooooooo</AnimatedText> */}
      <Button title="turn left" onPress={rotateLeft} />
      {/* <Component /> */}
    </View>
  );
}
