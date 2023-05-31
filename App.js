import React, { useEffect } from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import BaseTheme, { fonts } from "./theme/BaseTheme";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import RootContextProvider from "./store/context/root-context";
import Root from "./components/RootComponent";
import Floaters from "./components/core/Floaters";
import { LogBox } from "react-native";
import FavoritesContextProvider from "./store/context/favorites-context";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded])


  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={BaseTheme} >
      <FavoritesContextProvider>
        <RootContextProvider>
          <Root />
          {/* <Floaters /> */}
        </RootContextProvider>
      </FavoritesContextProvider>
    </NativeBaseProvider >
  );
}



