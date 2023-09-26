import MainNav from "./MainNavigation.js";
import ProgressBar from "./progressBar.js";
import headerStyles from "../../css/Layout.module.css";
import Preloader from "./Preloader.js";
import { useContext, useEffect } from "react";
import FavoritesContext from "../../store/favorites";
import MeetupsContext from "../../store/meetUpsState.js";
import AdminModal from "../adminModal/index.js";
function Layout(props) {
  const favoriteContext = useContext(FavoritesContext);
  const globalContext = useContext(MeetupsContext);
  useEffect(() => {
    favoriteContext.getAllFavorite();
    globalContext.getSavedAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* {AllMeetups.loaded? <Preloader /> : null} */}
      <Preloader />
      <ProgressBar />
      <MainNav />
      <main className={headerStyles.main}>{props.children}</main>
      <AdminModal />
    </div>
  );
}

export default Layout;
