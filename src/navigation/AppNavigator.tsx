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
import ViewStory from '../screens/ViewStory';
import CameraScanner from '../screens/Scan/CameraScanner';

export type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
  Onboarding: undefined;
  AdDetails: { adId: string };
  AllImages: { images: any[]; initialIndex?: number };
  ImageGrid: { images: any[] };
  Filter: undefined;
  CameraScanner: undefined;
  CreateAd: undefined;
  ViewStory: {
    stories: Array<string | { uri: string }>;
    title?: string;
    views?: number;
    onSeeAd?: () => void;
  };
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
    <Stack.Screen name="ViewStory" component={ViewStory} />
    <Stack.Screen name="CameraScanner" component={CameraScanner} />
  </Stack.Navigator>
);

export default AppNavigator;
