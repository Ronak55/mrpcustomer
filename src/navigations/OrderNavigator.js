import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Order, OrderPunch, Settings, SettingsDetail} from '../screens';
import {ROUTES} from '../constants';

const Stack = createNativeStackNavigator();

function OrderNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.ORDER} component={Order} />
      <Stack.Screen name={ROUTES.ORDER_PUNCH} component={OrderPunch} />
    </Stack.Navigator>
  );
}

export default OrderNavigator;
