import { Box, Center, HStack, IconButton, Text, Button } from "native-base";
import { View } from 'react-native';
import { RootContext } from "../store/context/root-context";
import { useContext, useEffect, useLayoutEffect } from "react";
import { Dimensions } from "react-native";
import { ImageBackground } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker, Polyline, Callout } from "react-native-maps";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const PharmacyDetails = ({ route, navigation }) => {
    const { themeMode } = useContext(RootContext);
    const {id,name,address,garde,image,latitude,longitude,zone, distance, currentLocation} = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton icon={<AntDesign name={true ? 'star' : 'staro'} size={24} color={tintColor} />}
                borderRadius="full"
                _hover={{
                    bg: "lightBlue.200",
                }} _pressed={{
                    bg: "lightBlue.200",
                }}
            // onPress={favoriteMealHandler}
            />
        })
    }, [navigation]);

    return (
        <Box bg={themeMode.current.bgColor} flex={1}>
            <ImageBackground source={{ uri: 'https://raw.githubusercontent.com/Ay0ubN0uri/LocationPharmacies/master/client/public/images/img14.jpg?token=GHSAT0AAAAAACBDA3WUREYJINNLNJKKPLVUZDGGGVA' }}
                style={{
                    width: screenWidth,
                    height: screenHeight * 0.40,
                }}
                resizeMode={'cover'}
            >
                <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']} style={{
                    width: screenWidth,
                    height: screenHeight * 0.40,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    paddingVertical: 30,
                    paddingHorizontal: 25
                }}>
                    <Text fontSize={16} fontWeight={'bold'} color={'darkBlue.300'} numberOfLines={1} mb={2}>{name}</Text>
                    <Text numberOfLines={2} fontSize={15} color={'white'} fontWeight={'bold'} >{address}</Text>
                    <HStack marginX={3}>
                        {/* <FontAwesome5 name="walking" size={screenWidth * 0.05} color="white" /> */}
                        <FontAwesome5 name="car" size={screenWidth * 0.05} color="white" />
                        <Text numberOfLines={1} fontSize={14} marginX={3} opacity={0.8} color={'white'} >Distance : {distance} Km</Text>
                    </HStack>
                    <Center bg="lightBlue.500" _dark={{
                        bg: "darkBlue.400"
                    }} _text={{
                        color: "warmGray.50",
                        fontWeight: "700",
                        fontSize: "xs"
                    }} position="absolute" bottom="0" right='0' px="3" py="1.5" borderBottomLeftRadius={5}>
                        {garde.toUpperCase()}
                    </Center>
                </LinearGradient>

            </ImageBackground>

            <Center flex={1}>
                <MapView
                    region={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    loadingEnabled="true" mapType="satellite" style={{
                        width: '100%',
                        height: '100%',
                    }}>
                    <Marker coordinate={currentLocation} title="Your Current Location" pinColor="blue" />
                    <Marker coordinate={{latitude, longitude}} title={address} pinColor="red" />
                    <Polyline
                        coordinates={[currentLocation, {latitude, longitude}]}
                        strokeWidth={2}
                        strokeColor="green"
                    />
                </MapView>
            </Center>
        </Box>
    )
}

export default PharmacyDetails;