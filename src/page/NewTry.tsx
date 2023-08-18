import React, { FC, useState } from 'react';
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

export const NewTryScreen: FC = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  const handleButtonPress = () => {
    console.log('Button pressed');
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>New</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.textInput}
        placeholder="Input 1"
        value={input1}
        onChangeText={setInput1}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Input 2"
        secureTextEntry
        value={input2}
        onChangeText={setInput2}
      />

      <TextInput
        style={[styles.textInput, styles.numericInput]}
        placeholder="Input 3"
        keyboardType="numeric"
        value={input3}
        onChangeText={setInput3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  numericInput: {
    backgroundColor: '#f5f5f5',
  },
});
