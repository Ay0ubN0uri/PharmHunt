import axios from "axios"

const BACKEND_URL = 'https://calm-puce-fawn-kit.cyclic.app';

export const fetchCities = async () => {
    try{
        const resp = await axios({
            method: 'get',
            url: `${BACKEND_URL}/api/cifties`
        });
        return resp.data;
    }
    catch(err){
        console.log(err)
        return null;
    }
}

export const fetchPharmacies = async () => {
    try{
        const resp = await axios({
            method: 'get',
            url: `${BACKEND_URL}/api/pharmacies`
        });
        return resp.data;
    }
    catch(err){
        console.log(err)
        return null;
    }
}