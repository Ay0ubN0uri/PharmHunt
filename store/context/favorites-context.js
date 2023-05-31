import { createContext, useState } from "react";


export const FavoritesContext = createContext({
    currentLocation: {},
    pharmacies: [],
    setCurrentLocation: (curr) => { },
    addFavorite: (id) => { },
    removeFavorite: (id) => { },
});


const FavoritesContextProvider = ({ children }) => {
    const [favoritePharmacies, setFavoritePharmacies] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);

    const addFavorite = (pharmacy) => {
        console.log('hello from add ', pharmacy, favoritePharmacies.find(fav => fav.id == pharmacy.id))
        setFavoritePharmacies(currentFav => {
            return [...currentFav, pharmacy];
        });
    }

    const removeFavorite = (id) => {
        console.log('hello from remove', id, favoritePharmacies.filter(pharmacy => pharmacy.id != id))
        setFavoritePharmacies(currentFav => currentFav.filter(pharmacy => pharmacy.id != id));
    }

    const value = {
        currentLocation: currentLocation,
        pharmacies: favoritePharmacies,
        setCurrentLocation: setCurrentLocation,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite
    }

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesContextProvider;