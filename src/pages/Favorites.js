import { useContext } from "react";
import FavoritesContext from "../store/favorites";
import MeetupList from "../components/Meetup/MeetupList";

function FavoritesPage() {
  const favoriteContex = useContext(FavoritesContext);

  let contexHTML;

  if (favoriteContex.totalFavorites === 0) {
    contexHTML = <p>No favourites</p>;
  } else {
    console.log(favoriteContex.favorites);
    contexHTML = <MeetupList items={favoriteContex.favorites} />;
  }

  return (
    <div>
      <h2> Favourites</h2>
      <div>{contexHTML}</div>
    </div>
  );
}
export default FavoritesPage;
