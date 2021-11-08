import { useContext } from "react";
import FavoritesContext from "../store/favorites";
import MeetupList from "../components/Meetup/MeetupList";

function FavoritesPage() {
  const favoriteContex = useContext(FavoritesContext);

  let contexHTML;

  if (favoriteContex.totalFavorites === 0) {
    contexHTML = <p>No Favorites</p>;
  } else {
    contexHTML = <MeetupList items={favoriteContex.favorites} />;
  }

  return (
    <div>
      <h1> Favorites</h1>
      <div>{contexHTML}</div>
    </div>
  );
}
export default FavoritesPage;
