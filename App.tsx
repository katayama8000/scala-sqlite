import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './pages/Home';
import { DetailsScreen } from './pages/Detail';
import { NotificationScreen } from './pages/Notification';
import { List } from './pages/ List';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{ itemId: 42, otherParam: 'anything you want here' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
