import { Text, View, Button } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import { FC } from 'react';

type RootStackParamList = {
  Home: undefined;
  Detail: { itemId: number; otherParam: string; age: number };
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

type Props = {
  route: DetailScreenRouteProp;
  navigation: any;
};

export const DetailScreen: FC<Props> = ({ route, navigation }) => {
  const { itemId, otherParam, age } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Text>age: {JSON.stringify(age)}</Text>
      <Button
        title="Go to Detail... again"
        onPress={() =>
          navigation.navigate('Detail', {
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
};
