import React, { useEffect } from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import BaseTheme, { fonts } from "./theme/BaseTheme";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import RootContextProvider from "./store/context/root-context";
import Root from "./components/RootComponent";
import Floaters from "./components/core/Floaters";

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
      <RootContextProvider>
        <Root />
        {/* <Floaters /> */}
      </RootContextProvider>
    </NativeBaseProvider>
  );
}



