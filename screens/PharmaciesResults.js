import { Box, Center, FlatList, Pressable, useColorModeValue } from "native-base";
import { RootContext } from "../store/context/root-context";
import { useContext, useEffect, useState } from "react";
import { init } from "ws";
import { fetchAllPharmacies, fetchPharmacies } from "../utils/http";
import LoadingSpinner from "../components/core/LoadingSpinner";
import PharmacyItem from "../components/Pharmacies/PharmacyItem";
import PharmacySummary from "../components/Pharmacies/PharmacySummary";
import ErrorOverlay from "../components/core/ErrorOverlay";
import NothingFound from "../components/core/NothingFound";
import { SceneMap, TabView } from "react-native-tab-view";
import { Dimensions, StatusBar } from "react-native";
import Animated from "react-native-reanimated";



const ListView = ({ route }) => {
    const { city, zone, night, day } = route.params;
    const [pharmacies, setPharmacies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const init = async () => {
        let nightPharmacies = [];
        let dayPharmacies = [];
        if (night) {
            nightPharmacies = await fetchPharmacies(city, zone, 'nuit');
            if (nightPharmacies == null) {
                setError("Something Want Wrong");
                return;
            }
        }
        if (day) {
            dayPharmacies = await fetchPharmacies(city, zone, 'jour');
            if (dayPharmacies == null) {
                setError("Something Want Wrong");
                return;
            }
        }
        setPharmacies(nightPharmacies.concat(dayPharmacies));
        setIsLoading(false);
    }

    useEffect(() => {
        init();
    }, [pharmacies])
    const renderPharmacyItem = (itemData) => {
        const pharmacy = itemData.item;
        const pharmacyProps = {
            id: pharmacy._id,
            name: pharmacy.name,
            address: pharmacy.address,
            garde: pharmacy.garde,
            image: pharmacy.images[0].url,
            latitude: pharmacy.latitude,
            longitude: pharmacy.longitude,
            zone: pharmacy.zone,
        }
        return <PharmacyItem key={pharmacy._id} {...pharmacyProps} />
    }
    return (
        <>
            {
                error ? <ErrorOverlay message={error} onPress={() => {
                    setError(null);
                    setIsLoading(true);
                    init();
                }} /> :
                    isLoading ? <LoadingSpinner /> :
                        pharmacies.length == 0 ? <NothingFound message={"Nothing Found"} /> :
                            <>
                                <PharmacySummary pharmaciesCount={pharmacies.length} />
                                <FlatList data={pharmacies} keyExtractor={item => item._id} renderItem={renderPharmacyItem} />
                            </>
            }
        </>
    )
}

const MapView = () => {
    return (
        <Center flex={1} my="4">
            This is map view
        </Center>
    )
}

const initialLayout = {
    width: Dimensions.get('window').width
};



const PharmaciesResults = ({ route }) => {
    const { themeMode } = useContext(RootContext);




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
        listView: () => <ListView route={route} />,
        mapView: MapView,
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
                return <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
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
            <TabView navigationState={{
                index,
                routes
            }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{
                marginTop: StatusBar.currentHeight
            }} />




        </Box>
    )
}

export default PharmaciesResults;