import { Box, Center, HStack, IconButton, Text } from "native-base";
import { RootContext } from "../store/context/root-context";
import { useContext, useEffect, useLayoutEffect } from "react";
import { Dimensions } from "react-native";
import { ImageBackground } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const PharmacyDetails = ({ route, navigation }) => {
    const { themeMode } = useContext(RootContext);
    const pharmacy = route.params;
    console.log(pharmacy.image);

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
            <ImageBackground source={{ uri: pharmacy.image }}
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
                    <Text fontSize={16} fontWeight={'bold'} color={'darkBlue.300'} numberOfLines={1} mb={2}>{pharmacy.name}</Text>
                    <Text numberOfLines={2} fontSize={15} color={'white'} fontWeight={'bold'} >{pharmacy.address}</Text>
                    <HStack marginX={3}>
                        {/* <FontAwesome5 name="walking" size={screenWidth * 0.05} color="white" /> */}
                        <FontAwesome5 name="car" size={screenWidth * 0.05} color="white" />
                        <Text numberOfLines={1} fontSize={14} marginX={3} opacity={0.8} color={'white'} >Distance : 45 Km</Text>
                    </HStack>
                    <Center bg="lightBlue.500" _dark={{
                        bg: "darkBlue.400"
                    }} _text={{
                        color: "warmGray.50",
                        fontWeight: "700",
                        fontSize: "xs"
                    }} position="absolute" top="0" right='0' px="3" py="1.5" borderBottomLeftRadius={5}>
                        {pharmacy.garde.toUpperCase()}
                    </Center>
                </LinearGradient>

            </ImageBackground>
            <Center>
                hello all
            </Center>
        </Box>
    )
}

export default PharmacyDetails;