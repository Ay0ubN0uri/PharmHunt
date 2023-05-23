import { Center } from "native-base";
import MapView, { Marker } from "react-native-maps";

const MapViewTab = ({ pharmacies }) => {
    return (
        <Center flex={1}>
            <MapView
                region={{
                    latitude: pharmacies[0].latitude,
                    longitude: pharmacies[0].longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                loadingEnabled="true" mapType="satellite" style={{
                    width: '100%',
                    height: '100%',
                }}>
                {pharmacies.map((pharmacy, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: pharmacy.latitude, longitude: pharmacy.longitude }}
                        title={`${pharmacy.name} (${pharmacy.garde.toUpperCase()})`}
                        description={pharmacy.address}
                    />
                ))}
            </MapView>
        </Center>
    )
}

export default MapViewTab;