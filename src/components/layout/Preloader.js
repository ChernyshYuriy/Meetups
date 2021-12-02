import { useContext } from "react";
// import StylesElem from "../../css/Preloader.module.css";
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
            {/* <div className={StylesElem["main-point"]}/>
            <div className={StylesElem["server-point"]}></div>
            <div className={`${StylesElem["data-point"]} ${StylesElem["data-point-one"]}`}/>
            <div className={`${StylesElem["data-point"]} ${StylesElem["data-point-two"]}`}/>
            <div className={`${StylesElem["data-point"]} ${StylesElem["data-point-tree"]}`}/> */}
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
