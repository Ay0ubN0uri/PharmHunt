import { Box, Center } from "native-base";
import { RootContext } from "../store/context/root-context";
import { useContext } from "react";

const FavoritesPharmacies = () => {
    const { themeMode } = useContext(RootContext);

    return (
        <Box bg={themeMode.current.bgColor} flex={1}>
            <Center >
                hello all
            </Center>
        </Box>
    )
}

export default FavoritesPharmacies;