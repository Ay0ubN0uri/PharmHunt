import { DefaultTheme, NavigationContainer, useNavigationState } from "@react-navigation/native";
import { Box, Center, Text, useColorMode, useColorModeValue, useToken } from "native-base";
import RootNavigator from "../navigators/RootNavigator";
import { StatusBar } from "expo-status-bar";
import Floaters from "./core/Floaters";
import { useEffect } from "react";

const Root = () => {
    // const { colorMode, toggleColorMode } = useColorMode();
    // const [lightBg, darkBg] = useToken(
    //     'colors',
    //     ['coolGray.50', 'blueGray.900'],
    //     'blueGray.900',
    // );
    // const bgColor = useColorModeValue(lightBg, darkBg);



    return (
        <NavigationContainer
        // theme={{
        //     // ...DefaultTheme,
        //     colors: {
        //         ...DefaultTheme.colors,
        //         background: bgColor,
        //         // primary: 'rgb(255, 45, 85)',
        //     },
        //     dark: true,

        // }}
        >
            {/* <StatusBar
                style={colorMode === 'dark' ? 'light' : 'dark'}
                backgroundColor={colorMode == 'dark' ? '#27272a' : '#f3f2f2'}
                translucent={true}
            /> */}
            <RootNavigator />
            <Floaters />
        </NavigationContainer>
    )
}

// const f = {
//     colors: {
//         primary: 'rgb(0, 122, 255)',
//         background: 'rgb(242, 242, 242)',
//         card: 'rgb(255, 255, 255)',
//         text: 'rgb(28, 28, 30)',
//         border: 'rgb(216, 216, 216)',
//         notification: 'rgb(255, 59, 48)',
//     },
// }

export default Root;