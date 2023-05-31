import { Box, Center, FlatList, Pressable, useColorModeValue } from "native-base";
import { RootContext } from "../store/context/root-context";
import { useContext, useEffect, useState } from "react";
import { fetchAllPharmacies, fetchPharmacies } from "../utils/http";
import LoadingSpinner from "../components/core/LoadingSpinner";
import PharmacyItem from "../components/Pharmacies/PharmacyItem";
import PharmacySummary from "../components/Pharmacies/PharmacySummary";
import ErrorOverlay from "../components/core/ErrorOverlay";
import NothingFound from "../components/core/NothingFound";
import { SceneMap, TabView } from "react-native-tab-view";
import { Dimensions, StatusBar } from "react-native";
import Animated from "react-native-reanimated";
import MapView, { Marker } from "react-native-maps";
import ListViewTab from "../components/Pharmacies/ListViewTab";
import MapViewTab from "../components/Pharmacies/MapViewTab";


const initialLayout = {
    width: Dimensions.get('window').width
};

const images = [
    'https://images.unsplash.com/photo-1543243803-2c586f6068b6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHx8cGhhcm1hY3l8fHx8fHwxNjg0NTA5Njk2&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1920',
    'https://images.unsplash.com/photo-1587351021355-a479a299d2f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80',
    'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2346&q=80',
    'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80',
    'https://iowacapitaldispatch.com/wp-content/uploads/2022/07/drug2.jpg',
    'https://i.pinimg.com/originals/d9/6d/c7/d96dc765ac5b76f2c46d7624ee8e7acc.jpg',
    'http://www.cwpdesign.co.uk/wp-content/uploads/2015/07/ZW7B8811.jpg',
    'https://www.be-smooth.com/wp-content/uploads/2014/02/french-pharmacy.jpg',
    'https://s3-media0.fl.yelpcdn.com/bphoto/rBpRnIoF68Hkx0kAf673rA/o.jpg',
    'https://s3-media0.fl.yelpcdn.com/bphoto/46pZ6_s8Wr_WnUc78qiQjg/o.jpg',
    'https://live.staticflickr.com/5075/5850383833_e5c4d16d14_k.jpg',
    'https://www.coop-apm.com/pharmacie-jeanjaures/images/pharmacie1.jpg',
    'https://i.pinimg.com/originals/fb/03/20/fb0320c79932c44d5e88a05a933a00b1.jpg'
]


const PharmaciesResults = ({ route, navigation }) => {
    const { city, zone, night, day, currentLocation, resetForm } = route.params;
    const { themeMode } = useContext(RootContext);
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
        setPharmacies((nightPharmacies.concat(dayPharmacies)).map(pharmacy => {
            return {
                ...pharmacy,
                image: images[parseInt(pharmacy.images[0].url.split('.')[0].slice(3)) % images.length]
            }
        }))
        // setPharmacies(nightPharmacies.concat(dayPharmacies));
        setIsLoading(false);
    }

    useEffect(() => {
        init();
        navigation.addListener('beforeRemove', (e) => {
            resetForm();
        });
    }, [])


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

export default PharmaciesResults;