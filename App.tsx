import React from 'react';
import { Navigation } from './src/Router';

export default function App() {
  return (
    <Navigation
      onReady={async () => {
        // このタイミングで SplashScreen.hideAsync() を呼び出さない場合は、
        // SplashScreen が消えてから描画されるまでに空白が表示されてしまう
        // <https://docs.expo.dev/versions/latest/sdk/splash-screen/#usage>
        // try {
        //   await SplashScreen.hideAsync();
        // } catch (e) {
        //   Sentry.Native.captureException(e);
        // }
        // onReady は Promise の完了を待つわけではない
        Promise.resolve();
      }}
    />
  );
}
