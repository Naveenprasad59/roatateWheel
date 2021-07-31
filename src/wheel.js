/* eslint-disable prettier/prettier */
import React, {useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import Svg, {G, Path, Text as SvgText, Circle} from 'react-native-svg';
import {pie, arc} from 'd3-shape';
import {animated, useSpring, config } from '@react-spring/native';
import { interpolate } from 'd3-interpolate';

const animationDuration = 250;
const animationConfig = {
  to: async (next, cancel) => {
    await next({t: 1});
  },
  from: {t: 0},
  config: {duration: animationDuration},
  delay: 30000,
  reset: true,
};
export default function Wheel({wheelData, width, height, innerRadius, outerRadius}) {
  console.log(wheelData);
//    const sumOfArcs = getSumOfValueInArray(props.data, 'value');
  const cache = useRef([]);
  const radius = 240;
  const [flip, set] = React.useState(false);
   const createPie = pie()
     .value(d => d.value)
     .sort(null);
   const createArc = arc().innerRadius(0).outerRadius(outerRadius); //! innerRadius change here

  //  const createCentroid = arc()
  //    .innerRadius(0)
  //    .outerRadius(radius + radius / 3);
   const data = createPie(wheelData);
   const previousData = createPie(cache.current);

   const animatedProps = useSpring(animationConfig);
   const props = useSpring({
     to: {opacity: 1},
     from: {opacity: 0},
     reset: true,
     reverse: flip,
     delay: 100,
     config: config.molasses,
     onRest: () => set(!flip),
   });
   const AnimatedSvg = animated(Svg);
   
  useEffect(() => {
    cache.current = wheelData;
  });
  return (
    <View
      style={{
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AnimatedSvg width={width} height={height}>
        <G transform={`translate(${outerRadius} ${outerRadius})`}>
          {data.map((d, i) => (
            <Arc
              key={i}
              from={previousData[i]}
              to={d}
              index={data.length - i}
              createArc={createArc}
              // createCentroid={createCentroid}
              animatedProps={animatedProps}
              //   colors={palette}
              //   sumOfArcs={sumOfArcs}
              //   measureFormat={measureFormat}
              //   currencySymbol={props.currencySymbol}
              // height={200}
            />
          ))}
          {/* <Circle cx={150} cy={250} radius={250} fill="pink" /> */}
        </G>
        {/* <Circle cx={150} cy={250} radius={250} fill="pink" /> */}
      </AnimatedSvg>
      <Text>{data[2].data.text}</Text>
      <Text>{wheelData[2].text}</Text>
      {/* {console.log(data)} */}
    </View>
  );
}

const Arc = ({
  from,
  to,
  createArc,
  // createCentroid,
  //   sumOfArcs,
  measureFormat,
  // height,
  animatedProps,
  index,
}) => {
  // console.log(data)
  const AnimatedPath = animated(Path);
  const AnimatedSvgText = animated(SvgText);
  const AnimatedG = animated(G);
  //   const interpolator = d3.interpolate(from, to);
  // const x = createCentroid.centroid(to)[0];
  // const y = createCentroid.centroid(to)[1];
  const interpolator = interpolate(from, to);
  // console.log('eheajfnkejn',interpolator(0))
  // console.log(
  //   animatedProps.t.interpolate(
  //     t => `translate(${createArc.centroid(interpolator(t))})`,
  //   ),
  // );
  return (
    <AnimatedG>
      <AnimatedPath
        d={animatedProps.t.interpolate(t => createArc(interpolator(t)))}
        fill={index === 3 ? 'red' : 'blue'}
        stroke="white"
        strokeWidth="1"
      />
      <AnimatedG>
        <AnimatedSvgText
          transform={animatedProps.t.interpolate(
            t => `translate(${createArc.centroid(interpolator(t))})`,
          )}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="10"
          fill="white"
          fontWeight="bold">
          {to.data.text}
        </AnimatedSvgText>
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
      </AnimatedG>
    </AnimatedG>
  );
};

{/* <G>
  <Path
    d={createArc(to)}
    fill={index === 3 ? 'red' : 'blue'}
    stroke="white"
    strokeWidth="1"
  />
  <G>
    <SvgText
      x={x}
      y={y + 32}
      textAnchor="middle"
      alignmentBaseline="middle"
      fontSize={40}
      fill="white"
      fontWeight="bold">
      {to.data.text}
    </SvgText>
  </G>
</G>; */}
