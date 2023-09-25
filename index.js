/**
 * @format
*/

import {AppRegistry, Platform } from 'react-native';
import App from './App';
import {Provider} from 'react-redux';
import reduxStore from './src/redux';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import React from "react";

// // Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });

// // Subscribe all devices to a common topic
// messaging().subscribeToTopic('all-users');

const RootApp = () => {
    const [appIsReady, setAppIsReady] = React.useState(false);

    const [fontsLoaded, fontError] = useFonts({
    "Inter-Thin": require("./assets/fonts/Inter-Thin.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  });

  React.useEffect(() => {
    async function prepare() {
      // Keep the splash screen visible
      await SplashScreen.preventAutoHideAsync();
      // Do what you need before the splash screen gets hidden
      console.log("I'm a task that gets executed before splash screen disappears");
      // Then tell the application to render
      setAppIsReady(true);
    }
    prepare();
  }, []);

  React.useEffect(() => {
    if (appIsReady) {
      // Hide the splash screen
       async function prepare() {
           console.log("About to disppear!!");

          await SplashScreen.hideAsync();

          console.log("Disapperaed!!");
       }

       prepare();
     
    }
  }, [appIsReady])


  if (!appIsReady) {
    return null;
  }

  return (
    <Provider  store={reduxStore}>
      <App />
    </Provider>
  );
};

export default RootApp;