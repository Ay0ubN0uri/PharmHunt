import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { RootContext } from "../store/context/root-context";
import FindPharmacies from "../screens/FindPharmacies";
import PharmaciesResults from "../screens/PharmaciesResults";

const Stack = createNativeStackNavigator();

const PharmacyNavigator = () => {
    const { themeMode } = useContext(RootContext);

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: themeMode.current.bgHeaderColor,
            },
            headerTitleStyle: {
                fontFamily: 'Archivo-Medium',
                backgroundColor: themeMode.current.bgHeaderColor,
            },
            headerTintColor: themeMode.current.fgHeaderColor,
            headerTitleAlign: 'center',
            presentation: 'modal',
            gestureEnabled: false,
        }}>
            <Stack.Screen name="Find Pharmacies2" component={FindPharmacies} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Pharmacy Results" component={PharmaciesResults} options={{
                title: 'Pharmacy Results',
            }} />
        </Stack.Navigator>
    );
}

export default PharmacyNavigator;