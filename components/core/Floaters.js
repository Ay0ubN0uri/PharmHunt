import { Fab, Icon, StatusBar, useColorMode } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../../store/context/root-context";
import { useNavigationState } from "@react-navigation/native";



const Floaters = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const state = useNavigationState(state => state);

    // let navigationMode = 'tab';
    // if (state && state.routeNames[state.index] === 'ManageExpense') {
    //     navigationMode = 'stack';
    // }

    return (
        <>
            <Fab
                shadow={7}
                variant="unstyled"
                _dark={{
                    bg: 'lightBlue.50',
                    _hover: {
                        bg: 'orange.100',
                    },
                    _pressed: {
                        bg: 'orange.100',
                    },
                }}
                _light={{
                    bg: 'darkBlue.400',
                    _hover: {
                        bg: 'blueGray.800',
                    },
                    _pressed: {
                        bg: 'blueGray.800',
                    },
                }}
                p={3}
                // bottom={navigationMode == 'tab' ? 16 : 4}
                bottom={4}
                icon={
                    <Icon
                        as={Ionicons}
                        _dark={{ name: 'sunny', color: 'darkBlue.600' }}
                        _light={{ name: 'moon', color: 'lightBlue.50' }}
                        size="md"
                    />
                }
                onPress={() => {
                    toggleColorMode();
                }}
            />
        </>
    )
}

export default Floaters;
