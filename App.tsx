import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './pages/Home';
import { DetailsScreen } from './pages/Detail';
import { NotificationScreen } from './pages/Notification';
import { List } from './pages/ List';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';

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
        headerShown: true,
        headerBackButtonMenuEnabled: true,
      }}
    >
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        initialParams={{ itemId: 42, otherParam: 'anything you want here' }}
      />
    </Stack.Navigator>
  );
};

const linkingPrefix = Linking.createURL('/');

export default function App() {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: 'aquamarine',
          primary: '#f4511e',
          card: '#f4511e',
          text: '#f4511e',
          border: '#f4511e',
          notification: '#f4511e',
        },
        dark: false,
      }}
      // linkingを設定すると、URLを使って画面遷移ができるようになる
      linking={{
        prefixes: [linkingPrefix],
        config: {
          screens: {
            Home: 'home',
            Details: 'details',
            Notification: 'notification',
            List: 'list',
          },
        },
        async getInitialURL() {
          // First, you may want to do the default deep link handling
          // Check if app was opened from a deep link
          const url = await Linking.getInitialURL();
          console.log('url', url);

          if (url !== null) {
            return url;
          }

          // Handle URL from expo push notifications
          const response =
            await Notifications.getLastNotificationResponseAsync();
          console.log('response', response);
          return response?.notification.request.content.data.url;
        },
        subscribe(listener) {
          // 動作タイミング: アプリが起動したとき
          // 機能: アプリが起動したときに、URLを取得する
          const onReceiveURL = ({ url }: { url: string }) => listener(url);

          // Listen to incoming links from deep linking
          const eventListenerSubscription = Linking.addEventListener(
            'url',
            onReceiveURL
          );

          // Listen to expo push notifications
          const subscription =
            Notifications.addNotificationResponseReceivedListener(
              (response) => {
                const url = response.notification.request.content.data.url;

                // Any custom logic to see whether the URL needs to be handled
                //...
                // ここでロジックを書く

                // Let React Navigation handle the URL
                listener(url);
                // 指定のURLに遷移する
                listener(Linking.createURL(url));
                // createURLはdeepLinkを作成する
              }
            );

          return () => {
            // Clean up the event listeners
            eventListenerSubscription.remove();
            subscription.remove();
          };
        },
      }}
    >
      <RootStack initialRouteName="Home" />
    </NavigationContainer>
  );
}
