import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  useEffect(() => {
    console.log('Hello World');
  }, []);
  const handlePress = () => {
    alert('Hello World');
  };
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!!!!</Text>
      <Button title="Click Me" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
