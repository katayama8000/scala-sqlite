import { Text, View, Button } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number; otherParam: string };
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

// type DetailsScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'Details'
// >;

type Props = {
  route: DetailsScreenRouteProp;
  navigation: any;
};

export function DetailsScreen({ route, navigation }: Props) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
