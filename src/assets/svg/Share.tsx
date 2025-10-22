import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

type ShareIconProps = {
  color?: string;
  width?: number;
  height?: number;
};

const ShareIcon = ({
  color = '#1C274C',
  width = 24,
  height = 24,
}: ShareIconProps) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
    <Circle cx={18} cy={5} r={3} stroke={color} strokeWidth={1.2} fill="none" />
    <Circle cx={6} cy={12} r={3} stroke={color} strokeWidth={1.2} fill="none" />
    <Circle
      cx={18}
      cy={19}
      r={3}
      stroke={color}
      strokeWidth={1.2}
      fill="none"
    />
    <Path
      stroke={color}
      strokeWidth={1.2}
      d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
    />
  </Svg>
);

export default ShareIcon;
