import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AllTry } from './src/page/AllTry';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TryDetail } from './src/page/TryDetail';
import { type StackNavigationProp } from '@react-navigation/stack';
import { NewTry } from './src/page/NewTry';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type ScreenList = {
  AllTry: undefined;
  TryDetail: undefined;
  NewTry: undefined;
};

export type NavigationProp = StackNavigationProp<ScreenList>;

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="tab" component={MyTabs} />
        <Stack.Screen name="AllTry" component={AllTry} />
        <Stack.Screen name="TryDetail" component={TryDetail} />
        <Stack.Screen name="NewTry" component={NewTry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AllTry" component={AllTry} />
      <Tab.Screen name="NewTry" component={NewTry} />
    </Tab.Navigator>
  );
}
