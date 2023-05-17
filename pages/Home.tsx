import { Link } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';

export function HomeScreen({ navigation }) {
  // const func = (async () => {
  //   const str = await Linking.getInitialURL();
  //   console.log(str);
  //   return str;
  // })();

  const urlHooks = Linking.useURL();
  console.log('urlHooks', urlHooks);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen </Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to Notification"
        onPress={() => navigation.navigate('Notification')}
      />
      {/* <Button
        title="Linking expo"
        onPress={() => Linking.openURL('https://expo.dev')}
      /> */}
      <Link to="/list" style={{ color: 'red' }}>
        Link
      </Link>
      {/* <Button
        title="check"
        onPress={async () => {
          console.log(
            'check',
            await Notifications.getLastNotificationResponseAsync()
          );
        }}
      /> */}
    </View>
  );
}
