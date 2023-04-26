import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './pages/Home';
import { DetailsScreen } from './pages/Detail';
import { NotificationScreen } from './pages/Notification';
import { List } from './pages/ List';

const Stack = createNativeStackNavigator();
const RootStack = ({ initialRouteName }: { initialRouteName: string }) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        initialParams={{ itemId: 42, otherParam: 'anything you want here' }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <RootStack initialRouteName="Home" />
    </NavigationContainer>
  );
}
