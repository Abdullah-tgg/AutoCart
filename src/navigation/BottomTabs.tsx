import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import DummyScreen from '../screens/DummyScreen';
import { Text } from 'react-native';
import HomeIcon from '../assets/svg/Home.tsx';
import Magnifier from '../assets/svg/Magnifier.tsx';
import ScanIcon from '../assets/svg/Scan.tsx';
import MessageIcon from '../assets/svg/Message.tsx';
import UserIcon from '../assets/svg/User.tsx';
import StoryIcon from '../assets/svg/StoryIcon.tsx';
const Tab = createBottomTabNavigator();

const ACTIVE = '#07B007';
const INACTIVE = '#000';

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Home') {
            return (
              <HomeIcon
                color={focused ? ACTIVE : INACTIVE}
                width={24}
                height={24}
              />
            );
          }
          if (route.name === 'Search') {
            return (
              <Magnifier
                color={focused ? ACTIVE : INACTIVE}
                width={24}
                height={24}
              />
            );
          }
          if (route.name === 'Scan') {
            return (
              <ScanIcon
                color={focused ? ACTIVE : INACTIVE}
                width={24}
                height={24}
              />
            );
          }
          if (route.name === 'Messages') {
            return (
              <MessageIcon
                color={focused ? ACTIVE : INACTIVE}
                width={24}
                height={24}
              />
            );
          }
          if (route.name === 'Story') {
            return (
              <StoryIcon
                color={focused ? ACTIVE : INACTIVE}
                width={24}
                height={24}
              />
            );
          }
          if (route.name === 'Profile') {
            return (
              <UserIcon
                color={focused ? ACTIVE : INACTIVE}
                width={24}
                height={24}
              />
            );
          }
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={DummyScreen} />
      <Tab.Screen name="Scan" component={DummyScreen} />
      <Tab.Screen name="Messages" component={DummyScreen} />
      <Tab.Screen name="Story" component={DummyScreen} />
      <Tab.Screen name="Profile" component={DummyScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
