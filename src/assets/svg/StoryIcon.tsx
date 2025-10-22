import React from 'react';
import Svg, { Path } from 'react-native-svg';

type ExploreIconProps = {
  color?: string;
  width?: number;
  height?: number;
};

const StoryIcon = ({
  color = '#1F2937',
  width = 24,
  height = 24,
}: ExploreIconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.23 13.92c1.598.614 2.56 1.587 3.77 3.08m-3.77-3.08c-1.943-.747-3.405-.942-4.73-.92m4.73.92c1.515-1.666 2.51-2.867 6.27-3.42"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM22 12a10 10 0 0 1-.832 4M12 22a9.97 9.97 0 0 0 7.071-2.929M2 12a9.97 9.97 0 0 1 2.929-7.071M12 2a10 10 0 0 0-4 .832m0 18.336A10.02 10.02 0 0 1 2.832 16m13-13A10.02 10.02 0 0 1 21 8.168"
    />
  </Svg>
);

export default StoryIcon;
