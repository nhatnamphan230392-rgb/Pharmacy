import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';
import { MainStackComponent } from '../stack/MainStack';

interface AppNavigatorProps {
  onReady?: () => void;
}

const AppNavigator = React.forwardRef<NavigationContainerRef<{}>, AppNavigatorProps>(
  ({ onReady }, ref) => {
    return (
      <NavigationContainer ref={ref} onReady={onReady}>
        <MainStackComponent />
      </NavigationContainer>
    );
  },
);

export { AppNavigator };
