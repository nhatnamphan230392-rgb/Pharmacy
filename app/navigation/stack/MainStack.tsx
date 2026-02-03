import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREEN_ROUTE } from '@navigation';
import { OrderScreen, CheckoutScreen } from '@screens';

type MainStackParamList = {
  [SCREEN_ROUTE.ORDER_SCREEN]: undefined;
  [SCREEN_ROUTE.CHECKOUT_SCREEN]: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

const MainStackComponent = memo(() => {
  return (
    <Stack.Navigator
      id="MainStack"
      initialRouteName={SCREEN_ROUTE.ORDER_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={SCREEN_ROUTE.ORDER_SCREEN}
        component={OrderScreen}
      />
      <Stack.Screen
        name={SCREEN_ROUTE.CHECKOUT_SCREEN}
        component={CheckoutScreen}
      />
    </Stack.Navigator>
  );
});

export { MainStackComponent };
