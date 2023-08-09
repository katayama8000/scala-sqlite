import { Text, View, Button } from 'react-native';
import type { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number; otherParam: string; age: number };
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
  navigation: any;
};

export function DetailsScreen({ route, navigation }: Props) {
  const { itemId, otherParam, age } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Text>age: {JSON.stringify(age)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.navigate('Details', {
            itemId: Math.floor(Math.random() * 100),
            otherParam: 'I am japanese',
            age: 20,
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
