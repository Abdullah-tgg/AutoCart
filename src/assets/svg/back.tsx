import React from 'react';
import Svg, { Path } from 'react-native-svg';

type BackIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

const BackIcon: React.FC<BackIconProps> = ({ width = 24, height = 24, color = '#000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 19l-7-7 7-7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default BackIcon;
