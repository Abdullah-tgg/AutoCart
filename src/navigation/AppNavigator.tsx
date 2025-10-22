import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import BottomTabs from './BottomTabs';
import AdDetailsScreen from '../screens/AdDetails';
import OnboardingScreen from '../screens/Onboarding';
import AllImages from '../screens/AllImages';
import ImageGrid from '../screens/ImageGrid';
import FilterScreen from '../screens/FilterScreen';
import CreateAd from '../screens/CreateAd';

export type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
  Onboarding: undefined;
  AdDetails: { adId: string };
  AllImages: { images: any[]; initialIndex?: number };
  ImageGrid: { images: any[] };
  Filter: undefined;
  CreateAd: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName={'Splash'}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="MainTabs" component={BottomTabs} />
    <Stack.Screen name="AdDetails" component={AdDetailsScreen} />
    <Stack.Screen name="AllImages" component={AllImages} />
    <Stack.Screen name="ImageGrid" component={ImageGrid} />
    <Stack.Screen name="Filter" component={FilterScreen} />
    <Stack.Screen name="CreateAd" component={CreateAd} />
  </Stack.Navigator>
);

export default AppNavigator;
