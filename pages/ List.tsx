import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const List = () => {
  return (
    <KeyboardAwareScrollView extraHeight={100}>
      <View>
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
