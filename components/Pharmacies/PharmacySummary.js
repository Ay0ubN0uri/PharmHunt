import { Box, Center, HStack, Heading, useColorMode } from "native-base";
import { RootContext } from "../../store/context/root-context";
import { useContext } from "react";
import { FontAwesome } from '@expo/vector-icons';

const PharmacySummary = ({ pharmaciesCount }) => {
    const { themeMode } = useContext(RootContext);
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <HStack p={3} bg={'darkBlue.200'} m={4} mt={4} rounded="lg" alignItems="center" justifyContent={'space-between'}>
            <Heading fontWeight={'bold'} size="sm">Number of Pharmacies</Heading>
            <Heading fontWeight={'900'} size="lg" alignSelf={'center'} mt={1} alignItems="center">
                <FontAwesome name="medkit" size={24} color={colorMode == 'dark' ? 'white' : 'black'}/>
                {' '} {pharmaciesCount}
            </Heading>
        </HStack>
    )
}

export default PharmacySummary;