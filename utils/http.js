import axios from "axios"

const BACKEND_URL = 'https://calm-puce-fawn-kit.cyclic.app';

export const fetchCities = async () => {
    try {
        const resp = await axios({
            method: 'get',
            url: `${BACKEND_URL}/api/cities`
        });
        return resp.data;
    }
    catch (err) {
        console.log(err)
        return null;
    }
}
export const fetchZones = async () => {
    try {
        const resp = await axios({
            method: 'get',
            url: `${BACKEND_URL}/api/zones`
        });
        return resp.data;
    }
    catch (err) {
        console.log(err)
        return null;
    }
}

export const fetchPharmacies = async (city, zone, garde) => {
    try {
        const resp = await axios({
            method: 'get',
            url: `${BACKEND_URL}/api/pharmacies/${garde}/${zone}/${city}`
        });
        return resp.data;
    }
    catch (err) {
        console.log(err)
        return null;
    }
}

export const fetchAllPharmacies = async () => {
    try {
        const resp = await axios({
            method: 'get',
            url: `${BACKEND_URL}/api/pharmacies`
        });
        return resp.data;
    }
    catch (err) {
        console.log(err)
        return null;
    }
}