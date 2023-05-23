import { Box, Center, useColorModeValue } from "native-base";
import { RootContext } from "../store/context/root-context";
import { useContext, useState } from "react";
import ListViewTab from "../components/Pharmacies/ListViewTab";
import MapViewTab from "../components/Pharmacies/MapViewTab";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import ErrorOverlay from "../components/core/ErrorOverlay";
import LoadingSpinner from "../components/core/LoadingSpinner";
import NothingFound from "../components/core/NothingFound";
import { Dimensions, StatusBar } from "react-native";
import { FavoritesContext } from "../store/context/favorites-context";
import { SceneMap, TabView } from "react-native-tab-view";

const initialLayout = {
    width: Dimensions.get('window').width
};

const FavoritesPharmacies = () => {
    const { themeMode } = useContext(RootContext);
    const { pharmacies, currentLocation } = useContext(FavoritesContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [index, setIndex] = useState(0);
    const [routes, setRoutes] = useState([{
        key: 'listView',
        title: 'List View'
    }, {
        key: 'mapView',
        title: 'Map View'
    },
    ])

    const renderScene = SceneMap({
        listView: () => <ListViewTab currentLocation={currentLocation} pharmacies={pharmacies} />,
        mapView: () => <MapViewTab pharmacies={pharmacies} />,
    });

    const renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return <Box flexDirection="row">
            {props.navigationState.routes.map((route, i) => {
                const opacity = props.position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
                });
                const color = index === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
                const borderColor = index === i ? 'cyan.500' : useColorModeValue('coolGray.200', 'gray.400');
                return <Box key={i} borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
                    <Pressable onPress={() => {
                        console.log(i);
                        setIndex(i);
                    }}>
                        <Animated.Text style={{
                            color
                        }}>{route.title}</Animated.Text>
                    </Pressable>
                </Box>;
            })}
        </Box>;
    };

    return (
        <Box bg={themeMode.current.bgColor} flex={1}>
            {
                error ? <ErrorOverlay message={error} onPress={() => {
                    setError(null);
                    setIsLoading(true);
                    init();
                }} /> :
                    isLoading ? <LoadingSpinner /> :
                        pharmacies.length == 0 ? <NothingFound message={"Nothing Found"} /> :
                            <TabView navigationState={{
                                index,
                                routes
                            }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{
                                marginTop: StatusBar.currentHeight
                            }} />
            }
        </Box>
    )
}

export default FavoritesPharmacies;