import { useContext } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";
import StyleItem from "../../css/MeetupItem.module.css";
import FavoritesContext from "../../store/favorites";
import MeetupsContext from "../../store/meetUpsState";
import { useLocation } from 'react-router-dom'




function MeetupItem(props) {
  const location = useLocation();
  console.log(location.pathname);
  
  const nav = useNavigate();

  const AllMeetups = useContext(MeetupsContext);


  const favoriteContex = useContext(FavoritesContext);

  const itemIsFavorite = favoriteContex.itemIsFavorite(props.item.id);

  const favouriteUiBtnText = location.pathname === '/favorites' ? "Remove from " : "It is  "

  // let [deleting, setDeletingStatus] = useState(false)
  // setDeletingStatus(true)

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
      AllMeetups.editMeetup(props.item.id)
      //console.log(AllMeetups);
      resolve()
    }).then(() => nav("/edit"));
  }

  return (
    <div className={StyleItem.item}>
      <Card>
        <div className={StyleItem.image}>
          <img src={props.item.img} alt={props.item.title} />
        </div>
        <div className={StyleItem.information}>
          <h3 className={StyleItem.title}> {props.item.title}</h3>
          <div className={StyleItem.address}>{props.item.address}</div>
          <a
            className={StyleItem["map-link"]}
            href={props.item.mapLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Map
          </a>
          <p>{props.item.desc}</p>
          <p>{props.item.date ? `Time: ${props.item.date}`: null}</p>
          <p>{props.item.time ? `Time: ${props.item.time}`: null}</p>

        </div>
        <div className={StyleItem.actions}>
          <button className={StyleItem.button} onClick={toggleFavorite}>
            {itemIsFavorite ? favouriteUiBtnText : "Add to "} favourite
          </button>
          {location.pathname === '/favorites' ? null : (<button className={StyleItem.button} onClick={OpenEdit}>
            Edit
          </button>)}
          {location.pathname === '/favorites' ? null : (<button className={StyleItem.button} onClick={deleteMeetup}>
            Delete
          </button>)}
          
        </div>
      </Card>
    </div>
  );
}
export default MeetupItem;
