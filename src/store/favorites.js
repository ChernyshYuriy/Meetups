import { createContext, useState } from "react";

const FavoritesContext = createContext({
  fav0rites: [],
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
  };

  function addFavoriteHandler(favorite) {
    setUserFavorites((prevFavorites) => prevFavorites.concat(favorite));
  }
  function removeFavoriteHandler(meetupId) {
    setUserFavorites((prevFavorites) =>
      prevFavorites.filter((meetup) => meetup.id !== meetupId)
    );
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
