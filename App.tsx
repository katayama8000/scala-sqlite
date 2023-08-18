import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AllTryScreen } from './src/page/AllTry';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TryDetailScreen } from './src/page/TryDetail';
import { type StackNavigationProp } from '@react-navigation/stack';
import { NewTryScreen } from './src/page/NewTry';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountScreen } from './src/page/Account';

type ScreenList = {
  AllTry: undefined;
  TryDetail: undefined;
  NewTry: undefined;
  Account: undefined;
};

export type NavigationProp = StackNavigationProp<ScreenList>;

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="tab" component={MyTabs} />
        <Stack.Screen name="AllTry" component={AllTryScreen} />
        <Stack.Screen name="TryDetail" component={TryDetailScreen} />
        <Stack.Screen name="NewTry" component={NewTryScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AllTry" component={AllTryScreen} />
      <Tab.Screen name="NewTry" component={NewTryScreen} />
    </Tab.Navigator>
  );
};
