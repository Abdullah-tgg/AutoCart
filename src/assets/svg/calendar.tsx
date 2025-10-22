import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const Calendar = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#9CA3AF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18 2v2M6 2v2"
    />
    <Path
      stroke="#9CA3AF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.995 13h.01m-.01 4h.01m3.986-4H16m-8 0h.009M8 17h.009"
    />
    <Path
      stroke="#9CA3AF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.5 8h17M2.5 12.243c0-4.357 0-6.536 1.252-7.89C5.004 3 7.02 3 11.05 3h1.9c4.03 0 6.046 0 7.298 1.354C21.5 5.707 21.5 7.886 21.5 12.244v.513c0 4.357 0 6.536-1.252 7.89C18.996 22 16.98 22 12.95 22h-1.9c-4.03 0-6.046 0-7.298-1.354C2.5 19.293 2.5 17.114 2.5 12.756v-.513ZM3 8h18"
    />
  </Svg>
);
export default Calendar;
