import { Box, Center, FlatList } from "native-base";
import { RootContext } from "../store/context/root-context";
import { useContext, useEffect, useState } from "react";
import { init } from "ws";
import { fetchPharmacies } from "../utils/http";
import LoadingSpinner from "../components/core/LoadingSpinner";
import PharmacyItem from "../components/Pharmacies/PharmacyItem";
import PharmacySummary from "../components/Pharmacies/PharmacySummary";


const PharmaciesResults = () => {
    const { themeMode } = useContext(RootContext);
    const [pharmacies, setPharmacies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const pharmacies = await fetchPharmacies();
            if (!pharmacies) {
                console.log("is null");
            }
            setPharmacies(pharmacies.slice(1, 5));
            setIsLoading(false);
        }
        init();
    }, [])

    const renderPharmacyItem = (itemData) => {
        const pharmacy = itemData.item;
        const pharmacyProps = {
            id: pharmacy._id,
            name: pharmacy.name,
            address: pharmacy.address,
            garde: pharmacy.garde,
            image: pharmacy.images[0].url,
            latitude: pharmacy.latitude,
            longitude: pharmacy.longitude,
            zone: pharmacy.zone,
        }
        console.log(pharmacy);
        return <PharmacyItem {...pharmacyProps} />
    }

    return (
        <Box bg={themeMode.current.bgColor} flex={1}>
            {
                isLoading ? <LoadingSpinner /> :
                    <>
                        <PharmacySummary />
                        <FlatList data={pharmacies} keyExtractor={item => item._id} renderItem={renderPharmacyItem} />
                    </>
            }
        </Box>
    )
}

export default PharmaciesResults;