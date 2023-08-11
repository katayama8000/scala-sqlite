import { Link } from '@react-navigation/native';
import { View, Button } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate('Detail')}
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
};
