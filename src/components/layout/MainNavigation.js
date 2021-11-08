import { Link } from "react-router-dom";
import headerStyles from "../../css/MainNav.module.css";
import { useContext } from "react";
import FavoritesContext from "../../store/favorites";

function MainNav(props) {
  const favoriteContex = useContext(FavoritesContext);

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.logo}>
        {/* <img src="../../img/logo192.png" alt="" /> */}
        ReactDOM
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Meets</Link>
          </li>
          <li>
            <Link to="/favorites">
              Favorites{" "}
              {favoriteContex.totalFavorites === 0
                ? ""
                : favoriteContex.totalFavorites}
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
