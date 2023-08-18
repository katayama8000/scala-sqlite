import React, { FC } from 'react';
import { Button, View, Text, FlatList } from 'react-native';
import { Card } from '../component/Card';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../App';

interface Item {
  id: number;
  title: string;
  description: string;
}

export const AllTry: FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const data: Item[] = [
    { id: 1, title: 'タイトル1', description: '説明1' },
    { id: 2, title: 'タイトル2', description: '説明2' },
    { id: 3, title: 'タイトル3', description: '説明3' },
    { id: 4, title: 'タイトル4', description: '説明4' },
    { id: 5, title: 'タイトル5', description: '説明5' },
    { id: 6, title: 'タイトル6', description: '説明6' },
    { id: 7, title: 'タイトル7', description: '説明7' },
    { id: 8, title: 'タイトル8', description: '説明8' },
  ];

  const renderItem = ({ item }: { item: Item }) => {
    return (
      <Card
        key={item.id}
        title={item.title}
        description={item.description}
        onPress={() => {
          navigation.navigate('TryDetail');
        }}
      />
    );
  };

  return (
    <View>
      <Button
        title="新規作成"
        onPress={() => {
          navigation.navigate('NewTry');
        }}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
