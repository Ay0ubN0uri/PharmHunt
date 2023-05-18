import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SecondaryNavigator from "./SecondaryNavigator";
// import ManageExpense from "../screens/ManageExpense";
import { useContext, useEffect } from "react";
import { RootContext } from "../store/context/root-context";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import PharmacyDetails from "../screens/PharmacyDetails";

// const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
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
            <Stack.Screen name="ExpensesOverview" component={SecondaryNavigator} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Pharmacy Details" component={PharmacyDetails} options={{
                title: 'Pharmacy Details',
            }} />
        </Stack.Navigator>
    );
}

export default RootNavigator;