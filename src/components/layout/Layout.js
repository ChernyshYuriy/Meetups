// import { Link } from "react-router-dom";
import MainNav from "./MainNavigation.js";
import ProgressBar from "./progressBar.js";
import headerStyles from "../../css/Layout.module.css";

function Layout(props) {
  return (
    <div>
      <ProgressBar />
      <MainNav />
      <main className={headerStyles.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
