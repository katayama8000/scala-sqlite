import { Link, useFocusEffect } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import { useCallback, useEffect, useState } from 'react';

export function HomeScreen({ navigation }) {
  const [on, setOn] = useState<boolean>(false);

  useEffect(() => {
    setOn(true);
    // イベントリスナーに登録されている関数はコンポーネントがマウント時のみに時に登録される
    // Detailページに行って戻ってきた時は、Homeコンポーネントはマウントされているので、
    // イベントリスナーに登録されている関数は実行されない
    // そのため、Detailページに行って戻ってきた時に、onの値がfalseになることはない
    const listener = navigation.addListener('focus', () => {
      checkState();
    });
    return listener;
  }, []);

  const checkState = async () => {
    console.log('on', on);
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Link to="/list" style={{ color: 'red' }}>
        Link
      </Link>
      <Text>{on ? 'on' : 'off'}</Text>
      <Button
        title="on"
        onPress={() => {
          setOn(!on);
        }}
      />
    </View>
  );
}

/*
HomeScreenコンポーネントの挙動について説明します。onがfalseになる理由は、useEffectフックの依存配列が空になっているためです。

現在のuseEffectは以下のようになっています。

javascript
Copy
useEffect(() => {
  setOn(true);
  const listener = navigation.addListener('focus', () => {
    checkState();
  });
  return listener;
}, []);
useEffectの第二引数である依存配列が空の配列[]になっているため、このuseEffectはコンポーネントがマウントされる際に一度だけ実行されます。そのため、onの値がtrueに設定された後、Detailsページに遷移して戻ってくると、HomeScreenコンポーネントは再レンダリングされますが、useEffectが再度実行されないためonの値が変更されません。

この問題を解決するには、useEffectの依存配列にonを追加して、onの値が変更されるたびにuseEffectが実行されるようにします。

javascript
Copy
useEffect(() => {
  setOn(true);
  const listener = navigation.addListener('focus', () => {
    checkState();
  });
  return listener;
}, [on]);
ただし、これによりonが変更されるたびにuseEffectが実行されるので無限ループが発生します。無限ループを防ぐために、onがfalseからtrueに変わったときだけsetOn(true)を実行するように条件を追加しましょう。

javascript
Copy
useEffect(() => {
  if (!on) {
    setOn(true);
  }
  const listener = navigation.addListener('focus', () => {
    checkState();
  });
  return listener;
}, [on]);
これでHomeScreenコンポーネントが再レンダリングされた際、onの値が適切に更新されるようになります。ただし、onの値が他の箇所で変更される可能性がある場合、他の副作用が発生する可能性がありますので注意してください。
*/
