import { StatusBar } from "expo-status-bar";
import { useColorMode, useColorModeValue, useTheme, useToken } from "native-base";
import { createContext, useEffect, useState } from "react";
// import { ExpenseContextProvider } from "./expenses-context";

const expenses = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e5',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2022-02-18')
    },
    {
        id: 'e6',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e7',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e8',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e9',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2022-02-18')
    }
];

export const RootContext = createContext({
    // expenses: [],
    themeMode: {
        current: {
            fgInactiveColor: '',
            bgHeaderColor: '',
            fgHeaderColor: '',
            bgColor: '',
            fgColor: ''
        },
        dark: {
        },
        light: {
        }
    },
});


const RootContextProvider = ({ children }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [lightBg, darkBg] = useToken(
        'colors',
        ['lightBlue.50', 'darkBlue.600'],
        'darkBlue.400',
    );
    const [lightFg, darkFg] = useToken(
        'colors',
        ['lightBlue.400', 'white'],
        'white',
    );
    const [lightBgHeader, darkBgHeader] = useToken(
        'colors',
        ['white', 'darkBlue.400'],
        'darkBlue.400',
    );
    const [lightFgHeader, darkFgHeader] = useToken(
        'colors',
        ['lightBlue.500', 'white'],
        'white',
    );
    const theme = useTheme();

    const themeMode = {
        current: {
            bgHeaderColor: useColorModeValue(lightBgHeader, darkBgHeader),
            fgHeaderColor: useColorModeValue(lightFgHeader, darkFgHeader),
            bgColor: useColorModeValue(lightBg, darkBg),
            fgColor: useColorModeValue(lightFg, darkFg),
            fgInactiveColor: colorMode == '#f0f9ff' ? 'red' : '#addbff'
        },
        dark: {
            ...theme.colors.darkBlue
        },
        light: {
            ...theme.colors.lightBlue
        }
    }
    // themeMode.current = colorMode == 'dark' ? themeMode.dark : themeMode.light;
    useEffect(() => {
        // console.log('asdf', theme.colors);
    }, [])

    const value = {
        // expenses: expenses,
        themeMode: themeMode
    };
    return (
        <RootContext.Provider value={value}>
            {/* <ExpenseContextProvider> */}
                <StatusBar
                    style={colorMode === 'dark' ? 'light' : 'dark'}
                    backgroundColor={colorMode == 'dark' ? '#27272a' : '#f3f2f2'}
                    translucent={true}
                />
                {children}
            {/* </ExpenseContextProvider> */}
        </RootContext.Provider>
    )

}

export default RootContextProvider;