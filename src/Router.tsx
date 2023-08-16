import {
  LinkingOptions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import React from 'react';
import { LogBox } from 'react-native';
import { ListScreen } from '../pages/List';
import { HomeScreen } from '../pages/Home';
import { DetailScreen } from '../pages/Detail';
import { NotificationScreen } from '../pages/Notification';

const Stack = createStackNavigator();
const RootStack = () => {
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

const linkingPrefix = Linking.createURL('/');

type Props = {
  onReady?: () => void;
};

export const Navigation: React.FC<Props> = ({ onReady }) => {
  const navigation = useNavigation();
  return (
    <NavigationContainer
      onReady={onReady}
      linking={{
        prefixes: [linkingPrefix],
        config: linkingConfig,
        getInitialURL: () => {
          const url = Linking.getInitialURL();
          return url;
        },
        subscribe: (listener) => {
          const onReceiveURL = ({ url }: { url: string }) => listener(url);

          // Listen to incoming links from deep linking
          const eventListenerSubscription = Linking.addEventListener(
            'url',
            onReceiveURL
          );

          // Listen to expo push notifications
          const notificationSubscription =
            Notifications.addNotificationResponseReceivedListener(
              (notificationResponse) => {
                (async () => {
                  const url =
                    notificationResponse.notification.request.content.data.url;

                  console.log(
                    '---------------------',
                    notificationResponse.notification.request.content,
                    '----------------------'
                  );

                  // Let React Navigation handle the URL
                  listener(url);
                  // 指定のURLに遷移する
                  listener(Linking.createURL(url));
                  // createURLはdeepLinkを作成する
                })();
              }
            );

          return () => {
            eventListenerSubscription.remove();
            notificationSubscription.remove();
          };
        },
      }}>
      <RootStack />
    </NavigationContainer>
  );
};

const linkingPathConfigMap = {
  List: {
    path: 'list',
  },
  Home: {
    path: 'home',
  },
  Detail: {
    path: 'detail',
  },
  Notification: {
    path: 'notification',
  },
};

export const linkingConfig: LinkingOptions<
  typeof linkingPathConfigMap
>['config'] = {
  screens: linkingPathConfigMap,
};

// export const getUrlFromPushNotification = async (
//   notificationResponse: Notifications.NotificationResponse
// ): Promise<string | null> => {
//   try {
//     // TODO: PushTokenData のスキーマ検証
//     const data = notificationResponse.notification.request.content.data;

//     const { facilityId, issueId, commentId } = data.payload;
//     return createIssueItemUrl({ facilityId, issueId, commentId });
//   } catch (e) {
//     return null;
//   }
// };
