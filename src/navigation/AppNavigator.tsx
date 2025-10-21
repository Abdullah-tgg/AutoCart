import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import BottomTabs from './BottomTabs';
import AdDetailsScreen from '../screens/AdDetails';

export type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
  AdDetails: { adId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName={'Splash'}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="MainTabs" component={BottomTabs} />
    <Stack.Screen name="AdDetails" component={AdDetailsScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
