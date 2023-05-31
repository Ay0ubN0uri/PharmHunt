import { FlatList } from "native-base";
import NothingFound from "../core/NothingFound";
import PharmacyItem from "./PharmacyItem";
import PharmacySummary from "./PharmacySummary";

const ListViewTab = ({ currentLocation, pharmacies }) => {
    const renderPharmacyItem = (itemData) => {
        const pharmacy = itemData.item;
        const pharmacyProps = {
            id: pharmacy._id == undefined ? pharmacy.id : pharmacy._id,
            name: pharmacy.name,
            address: pharmacy.address,
            garde: pharmacy.garde,
            image: pharmacy.image,
            // image: pharmacy.images[0].url,
            latitude: pharmacy.latitude,
            longitude: pharmacy.longitude,
            zone: pharmacy.zone,
            currentLocation: currentLocation,
        }
        return <PharmacyItem key={pharmacyProps.id} {...pharmacyProps} />
    }
    return (
        <>
            {
                pharmacies.length == 0 ? <NothingFound message={"Nothing Found"} /> :
                    <>
                        <PharmacySummary pharmaciesCount={pharmacies.length} />
                        <FlatList data={pharmacies} keyExtractor={item => item._id == undefined ? item.id : item._id} renderItem={renderPharmacyItem} />
                    </>
            }
        </>
    )
}

export default ListViewTab;