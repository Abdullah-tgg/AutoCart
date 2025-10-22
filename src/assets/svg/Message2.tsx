import React from 'react';
import Svg, { Path } from 'react-native-svg';

type ChatIconProps = {
  color?: string;
  width?: number;
  height?: number;
};

const Message2 = ({
  color = '#000',
  width = 24,
  height = 24,
}: ChatIconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 32 32"
  >
    <Path
      fill={color}
      d="M30 1.25H2a.75.75 0 0 0-.75.75v22c0 .414.336.75.75.75h7.25V30c0 .292.167.545.411.668l.004.002c.096.05.21.08.331.08H10c.17 0 .326-.057.452-.152l-.002.001 7.8-5.85H30a.75.75 0 0 0 .75-.75v-22a.75.75 0 0 0-.75-.75zm-.75 22H18a.748.748 0 0 0-.452.152l.002-.001-6.8 5.1v-4.5a.75.75 0 0 0-.75-.75H2.75v-20.5h26.5zM6 9.75h20a.75.75 0 0 0 0-1.5H6a.75.75 0 0 0 0 1.5zm0 7h10a.75.75 0 0 0 0-1.5H6a.75.75 0 0 0 0 1.5z"
    />
  </Svg>
);

export default Message2;
