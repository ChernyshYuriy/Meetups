import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";
import StyleItem from "../../css/MeetupItem.module.css";
import FavoritesContext from "../../store/favorites";
import MeetupsContext from "../../store/meetUpsState";
import { useLocation } from "react-router-dom";

function MeetupItem(props) {
  const location = useLocation();

  const urlSearchParams = location.search;
  const searchId = urlSearchParams.split("").splice(4, location.search.length);
  let searchIdMeetup = "";
  searchId.forEach((leter) => (searchIdMeetup += leter));

  const urlForLink = `${window.location.origin}?id=${props.item.id}`;

  const nav = useNavigate();

  const AllMeetups = useContext(MeetupsContext);

  const favoriteContex = useContext(FavoritesContext);

  const itemIsFavorite = favoriteContex.itemIsFavorite(props.item.id);

  const favouriteUiBtnText =
    location.pathname === "/favorites" ? "Remove from " : "It is  ";

  // let [deleting, setDeletingStatus] = useState(false)
  // setDeletingStatus(true)

  let [textSuccessCopyStatus, setTextSuccessCopyStatus] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(urlForLink);
    setTextSuccessCopyStatus(true);

    setTimeout(() => {
      setTextSuccessCopyStatus(false);
    }, 1500);
  }

  function deleteMeetup() {
    props.deleteMeetup(props.item.id);
  }

  function toggleFavorite() {
    if (itemIsFavorite) {
      favoriteContex.removeFavorite(props.item.id);
    } else {
      favoriteContex.addFavorite(props.item);
    }
  }

  function OpenEdit() {
    new Promise((resolve, reject) => {
      AllMeetups.editMeetup(props.item.id);
      resolve();
    }).then(() => nav("/edit"));
  }

  return (
    <div
      id={searchIdMeetup === props.item.id ? "searchedMeetup" : null}
      className={StyleItem.item}
    >
      <Card>
        <div className={StyleItem.image}>
          <img src={props.item.img? props.item.img : 'https://cdn.dribbble.com/users/732679/screenshots/4108024/walking.gif'} alt="Cant load images" />
        </div>
        <div className={StyleItem.information}>
          <h3 className={StyleItem.title}> {props.item.title}</h3>
          <div className={StyleItem.address}>{props.item.address}</div>
          {props.item.mapLink ? (
            <a
              className={StyleItem.link}
              href={props.item.mapLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Map
            </a>
          ) : null}
          <div className={StyleItem.flex}>
            <span className={StyleItem.link} onClick={copyLink}>
              Copy link for this meetup{" "}
            </span>
            <span className={StyleItem["link-with-massage"]}>
              {textSuccessCopyStatus ? " Successfully copied" : null}
            </span>
          </div>

          <p>{props.item.desc}</p>
          <p>{props.item.date ? `Time: ${props.item.date}` : null}</p>
          <p>{props.item.time ? `Time: ${props.item.time}` : null}</p>
        </div>
        <div className={StyleItem.actions}>
          <button className={StyleItem.button} onClick={toggleFavorite}>
            {itemIsFavorite ? favouriteUiBtnText : "Add to "} favourite
          </button>
          {location.pathname === "/favorites" ? null : (
            <button className={StyleItem.button} onClick={OpenEdit}>
              Edit
            </button>
          )}
          {location.pathname === "/favorites" ? null : (
            <button className={StyleItem.button} onClick={deleteMeetup}>
              Delete
            </button>
          )}
          {/* {location.pathname === '/favorites' ? null : (<button className={StyleItem.button}>
            Copy
          </button>)} */}
        </div>
      </Card>
    </div>
  );
}
export default MeetupItem;
