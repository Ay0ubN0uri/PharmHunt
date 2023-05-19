import { Box, Center, FlatList } from "native-base";
import { RootContext } from "../store/context/root-context";
import { useContext, useEffect, useState } from "react";
import { init } from "ws";
import { fetchAllPharmacies, fetchPharmacies } from "../utils/http";
import LoadingSpinner from "../components/core/LoadingSpinner";
import PharmacyItem from "../components/Pharmacies/PharmacyItem";
import PharmacySummary from "../components/Pharmacies/PharmacySummary";
import ErrorOverlay from "../components/core/ErrorOverlay";
import NothingFound from "../components/core/NothingFound";


const PharmaciesResults = ({ route }) => {
    const { city, zone, night, day } = route.params;
    const { themeMode } = useContext(RootContext);
    const [pharmacies, setPharmacies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const init = async () => {
        let nightPharmacies = [];
        let dayPharmacies = [];
        if (night) {
            nightPharmacies = await fetchPharmacies(city, zone, 'nuit');
            if (nightPharmacies == null) {
                setError("Something Want Wrong");
                return;
            }
        }
        if (day) {
            dayPharmacies = await fetchPharmacies(city, zone, 'jour');
            if (dayPharmacies == null) {
                setError("Something Want Wrong");
                return;
            }
        }
        setPharmacies(nightPharmacies.concat(dayPharmacies));
        setIsLoading(false);
    }

    useEffect(() => {
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
        // console.log(pharmacy);
        return <PharmacyItem {...pharmacyProps} />
    }

    return (
        <Box bg={themeMode.current.bgColor} flex={1}>
            {
                error ? <ErrorOverlay message={error} onPress={() => {
                    setError(null);
                    setIsLoading(true);
                    init();
                }} /> :
                    isLoading ? <LoadingSpinner /> :
                        pharmacies.length == 0 ? <NothingFound message={"Nothing Found"} /> :
                            <>
                                <PharmacySummary pharmaciesCount={pharmacies.length} />
                                <FlatList data={pharmacies} keyExtractor={item => item._id} renderItem={renderPharmacyItem} />
                            </>
            }
        </Box>
    )
}

export default PharmaciesResults;