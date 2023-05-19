import { LinearGradient } from "expo-linear-gradient";
import { Center, HStack, Text } from "native-base";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import TouchableScale from "react-native-touchable-scale";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import {calculateDistance} from '../../utils/helper';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

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


const PharmacyItem = ({ id, name, address, garde, image, latitude, longitude, zone, currentLocation }) => {
    const navigation = useNavigation();
    const distance = calculateDistance(currentLocation, latitude, longitude);
    const handlePress = () => {
        navigation.navigate('Pharmacy Details', {
            id,
            name,
            address,
            garde,
            image: images[parseInt(image.split('.')[0].slice(3)) % images.length],
            latitude,
            longitude,
            zone,
            distance,
            currentLocation,
        });
    }

    return (
        <TouchableScale key={id} activeOpacity={1} onPress={handlePress} activeScale={0.98} tension={100} friction={10}>
            <ImageBackground
                style={styles.pharmacyCard}
                source={{ uri: images[parseInt(image.split('.')[0].slice(3)) % images.length] }}
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
                <Center
                    bg="lightBlue.500"
                    _dark={{
                        bg: "darkBlue.400"
                    }}
                    _text={{
                        color: "warmGray.50",
                        fontWeight: "700",
                        fontSize: "xs"
                    }}
                    position="absolute" top="0" left='0' px="3" py="1.5" borderBottomRightRadius={5}>
                    {zone.name.toUpperCase()}
                </Center>
            </ImageBackground>
        </TouchableScale>
    )
}

export default PharmacyItem;

const styles = StyleSheet.create({
    pharmacyCard: {
        width: screenWidth * 0.9,
        height: screenHeight * 0.4,
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