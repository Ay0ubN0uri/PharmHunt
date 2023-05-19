import { LinearGradient } from "expo-linear-gradient";
import { Center, HStack, Text } from "native-base";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import TouchableScale from "react-native-touchable-scale";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import geolib from 'geolib';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const calculateDistance = (currentLocation, pharmacyLatitude, pharmacyLongitude) => {
    // console.log("currentLocation.latitude", currentLocation.latitude);
    // console.log("pharmacyLocation.latitude", latitude);
    // console.log("currentLocation.longitude", currentLocation.longitude);
    // console.log("pharmacyLocation.longitude", longitude);

    const R = 6371; // Earth's radius in km
    const lat1 = currentLocation.latitude;
    const lon1 = currentLocation.longitude;
    const lat2 = pharmacyLatitude;
    const lon2 = pharmacyLongitude;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    // Distance will be in km
    // console.log('Distance:', distance);
    return distance.toFixed(2);
};

const PharmacyItem = ({ id, name, address, garde, image, latitude, longitude, zone, currentLocation }) => {
    const navigation = useNavigation();
    const distance = calculateDistance(currentLocation, latitude, longitude);
    const handlePress = () => {
        navigation.navigate('Pharmacy Details',{
            id,name,address,garde,image,latitude,longitude,zone, distance, currentLocation
        });
        // console.log(navigation)
    }

    return (
        <TouchableScale key={id} activeOpacity={1} onPress={handlePress} activeScale={0.98} tension={100} friction={10}>
            <ImageBackground
                style={styles.pharmacyCard}
                source={{ uri: 'https://raw.githubusercontent.com/Ay0ubN0uri/LocationPharmacies/master/client/public/images/img14.jpg?token=GHSAT0AAAAAACBDA3WUREYJINNLNJKKPLVUZDGGGVA' }}
                imageStyle={{ borderRadius: 8 }}>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.88)']}
                    style={styles.pharmacyGradient}>
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
                    }} position="absolute" bottom="0" right='0' px="3" py="1.5" borderTopLeftRadius={5}>
                        {garde.toUpperCase()}
                    </Center>
                </LinearGradient>
            </ImageBackground>
        </TouchableScale>
    )
}

export default PharmacyItem;

const styles = StyleSheet.create({
    pharmacyCard: {
        width: screenWidth * 0.9,
        height: screenHeight * 0.23,
        alignItems: 'flex-start',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        padding: 15,
        marginBottom: 20
    },
    pharmacyGradient: {
        position: 'absolute',
        padding: 15,
        left: 0,
        right: 0,
        bottom: 0,
        height: screenHeight * 0.23,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        borderRadius: 8
    }
})