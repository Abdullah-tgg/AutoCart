import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const Filter = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      stroke="#1F2937"
      strokeLinecap="round"
      d="M3.333 8V2.667m9.333 10.666v-2m-9.333 2v-2.666m9.333-2v-6M8 4.667v-2m0 10.666v-6M3.333 10.667a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667ZM8 7.333a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666ZM12.666 11.333a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666Z"
    />
  </Svg>
);
export default Filter;
