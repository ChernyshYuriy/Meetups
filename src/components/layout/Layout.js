// import { Link } from "react-router-dom";
import MainNav from "./MainNavigation.js";
import ProgressBar from "./progressBar.js";
import headerStyles from "../../css/Layout.module.css";
import Preloader from "./Preloader.js";
import { useContext, useEffect } from "react";
import FavoritesContext from "../../store/favorites";


function Layout(props) {


  const favoriteContext = useContext(FavoritesContext);
  
  useEffect(() => {
    favoriteContext.getAllFavorite()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      {/* {AllMeetups.loaded? <Preloader /> : null} */}
      <Preloader />
        <ProgressBar />
        <MainNav />
        <main className={headerStyles.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
