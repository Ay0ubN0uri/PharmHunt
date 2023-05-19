import { Box, Button, Center, CheckIcon, Checkbox, Divider, FormControl, Heading, Icon, PresenceTransition, Select, Stack, VStack, WarningOutlineIcon } from "native-base";
import { RootContext } from "../store/context/root-context";
import { useContext, useEffect, useState } from "react";
import { fetchCities, fetchPharmacies, fetchZones } from "../utils/http";
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import LoadingSpinner from "../components/core/LoadingSpinner";
import ErrorOverlay from "../components/core/ErrorOverlay";

import * as Location from 'expo-location';

const FindPharmacies = ({ navigation }) => {
    const { themeMode } = useContext(RootContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [city, setCity] = useState(null);
    const [zone, setZone] = useState(null);
    const [zones, setZones] = useState([]);
    const [allZones, setAllZones] = useState([]);
    const [cities, setCities] = useState([]);
    const [error, setError] = useState();
    const [night, setNight] = useState(true);
    const [day, setDay] = useState(true);
    const [currentLocation, setCurrentLocation] = useState(null);

    const init = async () => {
        const location = await getLocation();
        if (!location) {
            setError("Something Went Wrong");
        }
        const cities = await fetchCities();
        if (!cities) {
            setError("Something Want Wrong");
        }
        const zones = await fetchZones();
        if (!zones) {
            setError("Something Want Wrong");
        }

        setCurrentLocation(location);
        setCities(cities);
        setAllZones(zones);
        setIsLoading(false);
    }

    useEffect(() => {
        init();
    }, [])

    const getLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'You need to grant location permission to use this feature.');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            console.log("location: ", location);
            const { latitude, longitude } = location.coords;
            return { latitude, longitude }
        }
        catch (error) {
            console.error('Error while getting location:', error);
        }
    };

    const handleCityChange = (value) => {
        setCity(value);
        setZones(allZones.filter(zone => zone.city._id == value));
        setZone(null);
    }
    const handleZoneChange = (value) => {
        setZone(value);
    }

    const resetForm = () => {
        setZone('');
        setCity('');
        setNight(true);
        setDay(true);
    }

    const handleSearch = async () => {
        if (currentLocation) {
            navigation.navigate('Pharmacies Results', {
                city,
                zone,
                night,
                day,
                currentLocation,
                resetForm
            });
        }
    }

    return (
        <Box bg={themeMode.current.bgColor} flex={1} justifyContent={'center'} alignItems={'center'}>
            {
                error ? <ErrorOverlay message={error} onPress={() => {
                    setError(null);
                    setIsLoading(true);
                    init();
                }} /> : isLoading ? <LoadingSpinner /> :
                    <VStack my="4" space={5} w="100%" divider={<Box px="2">
                        <Divider />
                    </Box>}>
                        <VStack w="100%" space={5} alignSelf="center">
                            <Center mt={5}>
                                <Heading fontSize="2xl">Find Your Pharmacy</Heading>
                                <FormControl w="3/4" mt={5} isRequired >
                                    <FormControl.Label _text={{
                                        _dark: {
                                            color: 'white'
                                        },
                                        _light: {
                                            color: 'black'
                                        }
                                    }}>
                                        Choose city
                                    </FormControl.Label>
                                    <Select selectedValue={city} onValueChange={handleCityChange} fontSize={15} _light={{
                                        color: 'lightBlue.500',
                                        placeholderTextColor: 'black',
                                        bgColor: themeMode.current.bgHeaderColor
                                    }}
                                        _dark={{
                                            bgColor: themeMode.current.bgHeaderColor,
                                            color: 'white',
                                            placeholderTextColor: 'white'
                                        }}
                                        minWidth="200" accessibilityLabel="Select a city" placeholder="Select a city" _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size={5} />
                                        }} mt="1">
                                        {cities.map(city => {
                                            return <Select.Item key={city._id} label={city.name} value={city._id} />;
                                        })}
                                    </Select>
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        Please make a selection!
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl w="3/4" mt={5} isRequired >
                                    <FormControl.Label _text={{
                                        _dark: {
                                            color: 'white'
                                        },
                                        _light: {
                                            color: 'black'
                                        }
                                    }}>
                                        Choose zone
                                    </FormControl.Label>
                                    <Select selectedValue={zone} onValueChange={handleZoneChange} fontSize={15} _light={{
                                        color: 'lightBlue.500',
                                        placeholderTextColor: 'black',
                                        bgColor: themeMode.current.bgHeaderColor
                                    }}
                                        _dark={{
                                            bgColor: themeMode.current.bgHeaderColor,
                                            color: 'white',
                                            placeholderTextColor: 'white'
                                        }}
                                        minWidth="200" accessibilityLabel="Select a zone" placeholder="Select a zone" _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size={5} />
                                        }} mt="1">
                                        {zones.map(zone => {
                                            return <Select.Item key={zone._id} label={zone.name} value={zone._id} />;
                                        })}
                                    </Select>
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        Please make a selection!
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <Stack mt={6} direction={{
                                    base: "row",
                                    md: "column"
                                }} space={3} alignItems="flex-start">
                                    <Checkbox isChecked={night} onChange={value => setNight(value)}
                                        value="night" colorScheme="info" size={'md'} icon={<Icon as={<MaterialIcons name="nights-stay" size={24} color="black" />} />} >
                                        Night
                                    </Checkbox>
                                    <Checkbox isChecked={day} onChange={value => setDay(value)}
                                        size={'md'} value="day" colorScheme="info" icon={<Icon as={<Fontisto name="day-sunny" size={24} color="black" />} />}>
                                        Day
                                    </Checkbox>
                                </Stack>
                                <PresenceTransition style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center"
                                }} visible={city && zone && (night || day)} initial={{
                                    opacity: 0
                                }} animate={{
                                    opacity: 1,
                                    transition: {
                                        duration: 250
                                    }
                                }}>
                                    <Button mt={6} w={'3/4'} onPress={handleSearch}>
                                        Search
                                    </Button>
                                </PresenceTransition>
                            </Center>
                        </VStack>
                    </VStack>
            }
        </Box>
    )
}

export default FindPharmacies;