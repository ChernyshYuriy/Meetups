import { Link } from "react-router-dom";
import headerStyles from "../../css/MainNav.module.css";
import { useContext } from "react";
import FavoritesContext from "../../store/favorites";
import MeetupsContext from "../../store/meetUpsState";

function MainNav() {
  const favoriteContex = useContext(FavoritesContext);
  const AllMeetups = useContext(MeetupsContext);

  const countFavoritesElement = favoriteContex.totalFavorites ? (
    <span className={headerStyles["favorites-count"]}>
      {favoriteContex.totalFavorites === 0 ? "" : favoriteContex.totalFavorites}
    </span>
  ) : (
    ""
  );
  const classModificationFavorites =
    favoriteContex.totalFavorites === 0
      ? ""
      : headerStyles["favorites--with-count"];
  return (
    <header className={headerStyles.header}>
      <div
        className={headerStyles.logo}
        title="get Admin"
        onClick={() => AllMeetups.setAdminModalOpen(true)}
      >
        {AllMeetups.isAdmin ? "Walkers Admin" : "Walkers Meetings"}
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Meets</Link>
          </li>
          <li>
            <Link
              className={`${headerStyles.favorites} ${classModificationFavorites}`}
              to="/favorites"
            >
              Favourites{countFavoritesElement}
            </Link>
          </li>
          <li>
            <Link to="/new-meetup">New meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNav;
