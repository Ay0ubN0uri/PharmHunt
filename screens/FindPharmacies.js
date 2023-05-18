import { Box, Button, Center, CheckIcon, Checkbox, Divider, FormControl, Heading, Icon, Select, Stack, VStack, WarningOutlineIcon } from "native-base";
import { RootContext } from "../store/context/root-context";
import { useContext, useEffect } from "react";
import { fetchCities } from "../utils/http";
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';


const FindPharmacies = () => {
    const { themeMode } = useContext(RootContext);

    useEffect(() => {
        const init = async () => {
            const cities = await fetchCities();
            if (!cities) {
                console.log("is null");
            }
            console.log(cities);
        }
        init();
    }, [])


    return (
        <Box bg={themeMode.current.bgColor} flex={1} justifyContent={'center'} alignItems={'center'}>
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
                            <Select _light={{
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
                                <Select.Item label="El jadida" value="el jadida" />
                                <Select.Item label="beni mellal" value="beni mellal" />
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
                            <Select _light={{
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
                                <Select.Item label="El jadida" value="el jadida" />
                                <Select.Item label="beni mellal" value="beni mellal" />
                            </Select>
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                Please make a selection!
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <Stack mt={6} direction={{
                            base: "row",
                            md: "column"
                        }} space={3} alignItems="flex-start">
                            <Checkbox value="night" colorScheme="info" size={'md'} icon={<Icon as={<MaterialIcons name="nights-stay" size={24} color="black" />} />} defaultIsChecked>
                                Night
                            </Checkbox>
                            <Checkbox size={'md'} value="day" colorScheme="info" icon={<Icon as={<Fontisto name="day-sunny" size={24} color="black" />} />} defaultIsChecked>
                                Day
                            </Checkbox>
                        </Stack>
                        <Button mt={6} w={'3/4'}>
                            Search
                        </Button>
                    </Center>
                </VStack>
            </VStack>
        </Box>
    )
}

export default FindPharmacies;