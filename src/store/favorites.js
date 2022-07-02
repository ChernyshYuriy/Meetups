import { createContext, useState } from "react";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);
  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
    getAllFavorite: getAllFavoriteHandler,
  };

  function addFavoriteHandler(favourite) {
    setUserFavorites((prevFavorites) => prevFavorites.concat(favourite));

    localStorage.setItem(
      "favorites",
      JSON.stringify(userFavorites.concat([favourite]))
    );
  }
  function removeFavoriteHandler(meetupId) {
    setUserFavorites((prevFavorites) =>
      prevFavorites.filter((meetup) => meetup.id !== meetupId)
    );
    localStorage.setItem(
      "favorites",
      JSON.stringify(userFavorites.filter((meetup) => meetup.id !== meetupId))
    );
  }
  function getAllFavoriteHandler() {
    setUserFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }
  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  }

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}
export default FavoritesContext;
