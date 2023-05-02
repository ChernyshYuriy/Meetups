import { useContext } from "react";
import StylesElem from "../../css/PreloaderCircle.module.css";
import MeetupsContext from "../../store/meetUpsState";

function Preloader(props) {
  const AllMeetups = useContext(MeetupsContext);
  return (
    <div>
      {AllMeetups.loaded.status === false ? (
        <div className={StylesElem["preloader-body"]}>
          <div className={StylesElem["animation-container"]}>
            <div className={StylesElem.circleMain}></div>
            <div className={StylesElem.circleOne}></div>
            <div className={StylesElem.circleTwo}></div>
            <div className={StylesElem.circleThree}></div>
          </div>
          <div className={StylesElem["preloader"]}>
            {AllMeetups.loaded.preloaderText}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Preloader;
