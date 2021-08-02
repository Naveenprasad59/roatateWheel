/* eslint-disable prettier/prettier */
import React, {useEffect, useRef} from 'react';
import {View, Text, Alert} from 'react-native';
import Svg, {G, Path, Text as SvgText, TSpan, Image, Circle, Polygon} from 'react-native-svg';
import {pie, arc} from 'd3-shape';
import {animated, useSpring, config } from '@react-spring/native';
import { interpolate } from 'd3-interpolate';
import Animated from 'react-native-reanimated';

const animationDuration = 2500;
const animationConfig = {
  to: async (next, cancel) => {
    await next({t: 1});
  },
  from: {t: 0},
  config: {duration: animationDuration},
  // delay: 30000,
  reset: true,
};
export default function Wheel({tStyle,pstyle,textStyle,wheelData, width, height, innerRadius, outerRadius, style, api, astyle, currentIndex}) {
//    const sumOfArcs = getSumOfValueInArray(props.data, 'value');
  const cache = useRef([]);
  const radius = 240;
  const [flip, set] = React.useState(false);
   const createPie = pie()
     .value(d => d.value)
     .sort(null);
   const createArc = arc().innerRadius(innerRadius).outerRadius(outerRadius); //! innerRadius change here

   const createCentroid = arc()
     .innerRadius(0)
     .outerRadius(radius + radius / 3);
   const data = createPie(wheelData);
   const previousData = createPie(cache.current);
   const AnimatedView = animated(View);
   const AnimatedSvg = animated(Svg);
   const ASvg = Animated.createAnimatedComponent(Svg);
   const AG = Animated.createAnimatedComponent(G);
   const highlighter = data.map((d,i) => {
    return d;
   });
  useEffect(() => {
    cache.current = wheelData;
  });
  console.log(style);
  console.log(api);
  const hightLighterX = createCentroid.centroid(data[2])[0];
  const hightLighterY = createCentroid.centroid(data[2])[1];
  return (
    <AnimatedView
      style={{
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // width: style.width,
      }}>
      <ASvg
        width={width}
        height={height}
        // style={astyle}
        // style={{transform: style.x.to(x => `rotate(0deg)`)}}
      >
        <G transform={`translate(${outerRadius} ${outerRadius})`}>
          <AG width={width} height={height} style={astyle}>
            {data.map((d, i) => (
              <Arc
                key={i}
                from={previousData[i]}
                to={d}
                index={i}
                createArc={createArc}
                currentIndex={currentIndex}
                hightlight={highlighter}
                // tStyle={tStyle}
                createCentroid={createCentroid}
              />
            ))}
          </AG>
          <G>
            <Path d={createArc(highlighter[2])} fill="#192139" />
            <Image
              x={hightLighterX - 20}
              y={hightLighterY - 40}
              width="10%"
              height="10%"
              preserveAspectRatio="xMidYMid slice"
              // opacity="0.5"
              href={require('../assets/learn_from.png')}
            />
            <SvgText
              x={hightLighterX}
              y={hightLighterY + 10}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize={20}
              fill="white">
              <TSpan
                x={hightLighterX}
                dy="1.2em"
                transform="translate(0, 0) rotate(0)">
                {data[currentIndex].data.text1}
              </TSpan>
              <TSpan
                x={hightLighterX}
                dy="1.2em"
                transform="translate(0,0) rotate(0)">
                {data[currentIndex].data.text2}
              </TSpan>
              {/* {to.data.text} */}
            </SvgText>
          </G>
          <G>
            <Polygon
              points="-20,55 20,55 0,75"
              fill="pink"
              stroke="purple"
              strokeWidth="1"
            />
            <Circle
              cx={0}
              cy={0}
              r={innerRadius}
              fill="#192139"
              stroke="pink"
              strokeWidth="5"
            />
          </G>
        </G>
        {/* <Circle cx={0} cy={0} r={innerRadius} fill="pink" /> */}
      </ASvg>
      {/* <Path d={createArc(highlighter[currentIndex])} fill="red" /> */}
      {/* <Svg height="200" width="200"></Svg> */}
      {/* <Text>{data[2].data.text1}</Text>
      <Text>{wheelData[2].text}</Text> */}
      {/* {console.log(data)} */}
    </AnimatedView>
  );
}

const Arc = ({
  from,
  to,
  createArc,
  createCentroid,
  //   sumOfArcs,
  measureFormat,
  // height,
  // animatedProps,
  index,
  currentIndex,
  tStyle,
  hightlight,
  // textStyle,
  // pstyle,
}) => {
  const animatedProps = useSpring(animationConfig);
  console.log(animatedProps.t);
  // console.log(data)
  const AnimatedPath = animated(Path);
  const AnimatedSvgText = animated(SvgText);
  // const AnimatedG = animated(G);
  const AnimatedTSpan = Animated.createAnimatedComponent(TSpan);
  const AnimatedText = Animated.createAnimatedComponent(SvgText);
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const AnimatedG = Animated.createAnimatedComponent(G);
  // const AnimatedPath = Animated.createAnimatedComponent(Path);
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);
  //   const interpolator = d3.interpolate(from, to);
  const x = createCentroid.centroid(to)[0];
  const y = createCentroid.centroid(to)[1];
  // const interpolator = interpolate(from, to);
  return (
    <G>
      <Path
        d={createArc(to)}
        fill={'rgba(18, 25, 46, 1)'}
        // animatedProps={pstyle}
        // style={pstyle}
        stroke="black"
        strokeWidth="1"
        onPress={() => {
          if (index === currentIndex) {
            Alert.alert('Clicked');
          }
        }}
      />
      <AnimatedG>
        {/* <SvgText
          // transform={`translate(${createArc.centroid(to)})`}
          // style={textStyle}
          // textAnchor="middle"
          // alignmentBaseline="middle"
          // x={x}
          // y={y + 10}
          fontSize="20"
          fill="white"
          fontWeight="bold">
          {to.data.text}
        </SvgText> */}
        {/* <AnimatedSvg style={tStyle}> */}
        <AnimatedImage
          x={x - 20}
          y={y - 30}
          width="10%"
          height="10%"
          preserveAspectRatio="xMidYMid slice"
          // animatedProps={tStyle}
          // opacity="0.5"
          href={require('../assets/learn_from.png')}
        />
        <SvgText
          x={x}
          y={y + 15}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={15}
          // animatedProps={tStyle}
          fill="white">
          {/* <AnimatedTSpan x={x} dy="1.2em" animatedProps={tStyle}>
            {to.data.text1}
          </AnimatedTSpan> */}
          {/* <AnimatedTSpan x={x} dy="1.2em" animatedProps={tStyle}>
            {to.data.text2}
          </AnimatedTSpan> */}
          {/* <TSpan x={x} dy="1.2em" transform="translate(0,0) rotate(-72)">
            {to.data.text1}
          </TSpan> */}
          <TSpan x={x} dy="1.2em" transform="translate(0,0) rotate(360)">
            {to.data.text1}
          </TSpan>
          <TSpan x={x} dy="1.2em" transform="translate(0,0) rotate(360)">
            {to.data.text2}
          </TSpan>
          {/* {to.data.text} */}
        </SvgText>
        {/* <AnimatedSvgText
          transform={animatedProps.t.interpolate(
            t => `translate(${createArc.centroid(interpolator(t))})`,
          )}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={40}
          fill="white"
          fontWeight="bold">
          {to.data.color}
        </AnimatedSvgText> */}
        {/* <SvgText
          x={x}
          y={y + 32}
          textAnchor="middle"
          fontSize={30}
          fill="white"
          fontWeight="bold">
          {data.data.text}
        </SvgText> */}
        {/* </AnimatedSvg> */}
      </AnimatedG>
    </G>
  );
};


