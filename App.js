import React, {useEffect} from 'react';
import Wheel from './src/wheel';
// import {View}
import {useSpring, animated, config} from '@react-spring/native';
import {View, Button, Text} from 'react-native';

export default function App() {
  const data = [
    {
      value: 20,
      text: 'one',
      color: 'red',
    },
    {
      value: 20,
      text: 'two',
      color: 'blue',
    },
    {
      value: 20,
      text: 'three',
      color: 'yellow',
    },
    {
      value: 20,
      text: 'four',
      color: 'pink',
    },
    {
      value: 20,
      text: 'five',
      color: 'blue',
    },
  ];
  // const generateData = (value, length = 5) =>
  //   d3.range(length).map((item, index) => ({
  //     date: index,
  //     value: value === null || value === undefined ? 20 : value,
  //   }));
  // const data = generateData(0);
  const [wheelData, setWheelData] = React.useState(data);
  const [show, updateShow] = React.useState(true);
  const [flip, set] = React.useState(false);
  const rotateLeft = () => {
    // const arr = [1,2,3,4,5]
    setWheelData(prev => {
      const newData = prev;
      newData.unshift(newData.pop());
      console.log(newData);
      return newData;
    });
    // arr.unshift(arr.pop());
    updateShow(!show);
    console.log('rotate');
    // console.log(wheelData);
  };
  const props = useSpring({
    to: {opacity: 1},
    from: {opacity: 0},
    reset: true,
    reverse: flip,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!flip),
  });
  const AnimatedText = animated(Text);
  return (
    <View style={{flex: 1}}>
      <Wheel
        wheelData={wheelData}
        onRotate={rotateLeft}
        width={500}
        height={500}
        innerRadius={60}
        outerRadius={250}
      />
      {/* {show && <Text>{wheelData[0].text}</Text>} */}
      {/* <AnimatedText style={props}>YAhoooooooooooooooo</AnimatedText> */}
      <Button title="turn left" onPress={rotateLeft} />
    </View>
  );
}
