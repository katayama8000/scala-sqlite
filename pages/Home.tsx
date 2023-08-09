import { Link } from '@react-navigation/native';
import { View, Button } from 'react-native';

export function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to Notification"
        onPress={() => navigation.navigate('Notification')}
      />
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
