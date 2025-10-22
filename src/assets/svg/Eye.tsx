import React from 'react';
import Svg, { G, Path, Circle, Defs, ClipPath } from 'react-native-svg';

type EyeProps = {
  color?: string;
  width?: number;
  height?: number;
};

const Eye = ({ color = '#000', width = 24, height = 24 }: EyeProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
  >
    <G clipPath="url(#a)">
      <Circle cx={12} cy={13} r={2} stroke={color} strokeLinejoin="round" />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 7.5c-4.305 0-7.524 3.583-8.605 4.965a.86.86 0 0 0 0 1.07C4.476 14.917 7.695 18.5 12 18.5c4.305 0 7.524-3.583 8.605-4.965a.86.86 0 0 0 0-1.07C19.524 11.083 16.305 7.5 12 7.5Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Eye;
