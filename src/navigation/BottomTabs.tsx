import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import DummyScreen from '../screens/DummyScreen';
import { Text } from 'react-native';

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
            return <Text>?</Text>;
          }
          // Fallback: reuse Home icon for other tabs until their svgs are added
          return <Text>?</Text>;
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
