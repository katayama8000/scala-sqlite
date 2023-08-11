import React from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const ListScreen = ({ navigation }) => {
  return (
    <KeyboardAwareScrollView extraHeight={100}>
      <View>
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <TextInput style={styles.textInput} />
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={styles.textInput}
        />
      </View>
      <Button
        title="notification"
        onPress={() => navigation.navigate('Notification')}
      />
    </KeyboardAwareScrollView>
  );
};

// css
const styles = StyleSheet.create({
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
});
