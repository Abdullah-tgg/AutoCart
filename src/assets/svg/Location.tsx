import React from 'react';
import Svg, { Path } from 'react-native-svg';

type LocationIconProps = {
  color?: string;
  width?: number;
  height?: number;
};

const Location = ({
  color = '#080341',
  width = 24,
  height = 24,
}: LocationIconProps) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
    <Path
      fill={color}
      fillRule="evenodd"
      d="M12.285 18.994c-.128.093-.248.179-.357.255a13.41 13.41 0 0 1-.385-.266 18.008 18.008 0 0 1-2.36-2.03C7.454 15.179 6 12.915 6 10.5a6 6 0 1 1 12 0c0 2.39-1.518 4.647-3.31 6.44-.87.87-1.746 1.57-2.405 2.053ZM19.5 10.5c0 6-7.5 10.5-7.5 10.5-.375 0-7.5-4.5-7.5-10.5a7.5 7.5 0 1 1 15 0Zm-6 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm1.5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default Location;
