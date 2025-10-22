import React from 'react';
import Svg, { Path } from 'react-native-svg';

type MessageIconProps = {
  color?: string;
  width?: number;
  height?: number;
};

const MessageIcon = ({
  color = '#000',
  width = 24,
  height = 24,
}: MessageIconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m8 18 2.29 2.29a2.41 2.41 0 0 0 3.42 0L16 18h2a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v7a4 4 0 0 0 4 4h2ZM17 9H7M13 12H7"
    />
  </Svg>
);

export default MessageIcon;
