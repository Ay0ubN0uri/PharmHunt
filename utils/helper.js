
export const calculateDistance = (currentLocation, pharmacyLatitude, pharmacyLongitude) => {
    const R = 6371;
    const lat1 = currentLocation.latitude;
    const lon1 = currentLocation.longitude;
    const lat2 = pharmacyLatitude;
    const lon2 = pharmacyLongitude;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance.toFixed(2);
}

export const generateGoogleMapsURL = (currentLocation, pharmacyLocation) => {
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
    const destination = `${pharmacyLocation.latitude},${pharmacyLocation.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    return url;
};