import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-notifications';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

type NotificationContent = {
  title: string;
  body: string;
  data?: Record<string, unknown>;
};

type Notification = {
  request: {
    content: NotificationContent;
  };
};

type RootStackParamList = {
  Home: undefined;
  Detail: { data: Record<string, unknown> };
  Notification: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Notification'>;
};

export function NotificationScreen({ navigation }: Props) {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<boolean | Notification>(
    false
  );
  const [countTap, setCountTap] = useState<number>(0);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    // 通知を受け取るためのトークンを取得する
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // 通知を受け取ったときの処理
    // このリスナーは、アプリがフォアグラウンドのときに通知を受け取るたびに起動されます
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // 通知をタップしたときの処理
    // このリスナーは、ユーザーが通知をタップまたは操作するたびに起動されます (アプリがフォアグラウンド、バックグラウンド、または強制終了されたときに機能します)
    // responseListener.current =
    //   Notifications.addNotificationResponseReceivedListener((response) => {
    //     console.log(response);
    //     // 通知をタップしたときに、画面遷移とdataを渡す
    //     navigation.navigate('Detail', {
    //       data: response.notification.request.content.data,
    //     });
    //     setCountTap((prev) => prev + 1);
    //   });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Title:{' '}
          {notification && (notification as Notification).request.content.title}
        </Text>
        <Text>
          Body:{' '}
          {notification && (notification as Notification).request.content.body}
        </Text>
        <Text>
          Data:{' '}
          {notification &&
            JSON.stringify((notification as Notification).request.content.data)}
        </Text>
      </View>
      <Text>通知タップ回数: {countTap}</Text>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          try {
            await schedulePushNotification();
          } catch (e) {
            throw new Error('error');
          }
        }}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

// 実際に通知を送る関数
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

// 通知を受け取るためのトークンを取得する関数
async function registerForPushNotificationsAsync() {
  let token: string;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
