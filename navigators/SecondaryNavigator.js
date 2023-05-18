import { useColorModeValue } from "native-base";
import { useContext, useEffect } from "react";
import { RootContext } from "../store/context/root-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FindPharmacies from "../screens/FindPharmacies";
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import FavoritesPharmacies from "../screens/FavoritesPharmacies";
import PharmaciesResults from "../screens/PharmaciesResults";

const Drawer = createDrawerNavigator();

const SecondaryNavigator = () => {
    const { themeMode } = useContext(RootContext);

    // const bgColor = useColorModeValue('coolGray.50', 'red');
    // console.log(themeMode);
    return (
        <Drawer.Navigator screenOptions={{
            headerTitleStyle: {
                fontFamily: 'Archivo-Medium'
            },
            drawerLabelStyle: {
                fontFamily: 'Archivo-Regular',
            },
            headerStyle: {
                backgroundColor: themeMode.current.bgHeaderColor,
            },
            headerTintColor: themeMode.current.fgHeaderColor,
            drawerStyle: {
                backgroundColor: themeMode.current.bgHeaderColor,
                elevation: 0
            },
            drawerActiveTintColor: themeMode.current.fgHeaderColor,
            drawerInactiveTintColor: themeMode.current.fgInactiveColor,
        }}
            // initialRouteName="Pharmacies Results"
        >
            <Drawer.Screen name="Find Pharmacies" component={FindPharmacies} options={{
                title: 'Find Pharmacy',
                drawerIcon: ({ color, size }) => <FontAwesome5 name="search" size={size} color={color} />
            }} />
            <Drawer.Screen name="Favorites Pharmacies" component={FavoritesPharmacies} options={{
                title: 'Favorites Pharmacies',
                drawerIcon: ({ color, size }) => <Octicons name="feed-star" size={size} color={color} />
            }} />
            <Drawer.Screen name="Pharmacies Results" component={PharmaciesResults} options={{
                title: 'Pharmacies Results',
                drawerIcon: ({ color, size }) => <Octicons name="feed-star" size={size} color={color} />
            }} />
        </Drawer.Navigator>
    )
}

export default SecondaryNavigator;