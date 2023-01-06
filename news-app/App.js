import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>this is first</Text>
      <View style={styles.itemContainer} >
        <View style={styles.leftContainer} >
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: "https://picsum.photos/id/10/200/200" }}
          />
        </View>
        <View style={styles.rightContainer} />
      </View>
      <StatusBar style="auto" />
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
  itemContainer: {
    height: 100,
    width: "100%",
    borderColor: "red",
    borderWidth: 1,
    flexDirection: "row",
  },
  leftContainer: {
    backgroundColor: "red",
    width: 100,
  },
  rightContainer: {
    backgroundColor: "blue",
    flex: 1,
  },
});
