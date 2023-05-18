import { Box, Center, HStack, Heading, Pressable, Stack, Text, VStack, useColorMode } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import { getFormattedDate } from "../../utils/date";
import { useNavigation, useNavigationState, useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { RootContext } from "../../store/context/root-context";

const ExpenseItem = ({ description, date, amount }) => {
    const navigation = useNavigation();
    const state = useNavigationState(state => state);
    const { colorMode, toggleColorMode } = useColorMode();
    const onExpensePressHandler = () => {
        console.log('item', state.type);
        navigation.navigate('ManageExpense');
    }
    return (
        <Box
            shadow={10} rounded="xl" overflow="hidden" m={2}
            _dark={{
                backgroundColor: "darkBlue.500"
            }}
            _light={{
                backgroundColor: "lightBlue.400"
            }}
        >
            <Pressable onPress={onExpensePressHandler}
                _dark={{
                    android_ripple: {
                        color: '#7dd3fc',
                    }
                }}
                _light={{
                    android_ripple: {
                        color: '#0077e6'
                    }
                }}
            >
                {
                    ({
                        isHovered,
                        isFocused,
                        isPressed
                    }) => (
                        <Box
                            style={{
                                transform: [{
                                    scale: isPressed ? 0.95 : 1
                                }]
                            }}
                        >
                            <HStack justifyContent={'space-between'}>
                                <HStack p={2} m={2} alignItems="center" justifyContent={'space-between'}>
                                    <Box>
                                        <Heading fontFamily={'body'} size={"md"} fontWeight={'700'}>
                                            {description}
                                        </Heading>
                                        <Heading size={'sm'} fontFamily={'body'} fontWeight={'200'}>
                                            {getFormattedDate(date)}
                                        </Heading>
                                    </Box>
                                </HStack>
                                <Center
                                    _light={{
                                        bg: "lightBlue.300"
                                    }}
                                    _dark={{
                                        bg: "darkBlue.300"
                                    }}
                                    p={4} mb={6} roundedTopRight={'xl'} roundedBottomLeft={'xl'}>
                                    <Heading size={'md'} >
                                        <FontAwesome name="dollar" size={18} color={colorMode == 'dark' ? 'white' : 'black'} />
                                        {' '}{amount.toFixed(2)}
                                    </Heading>
                                </Center>
                            </HStack>
                        </Box>
                    )
                }
            </Pressable>
        </Box>

    )
}
export default ExpenseItem;