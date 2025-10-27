import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator.tsx';
import { AdsProvider } from './src/contexts/AdsContext.tsx';

const App = () => {
  return (
    <AdsProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AdsProvider>
  );
};

export default App;
