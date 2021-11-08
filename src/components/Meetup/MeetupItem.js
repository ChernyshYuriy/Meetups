import { useContext } from "react";

import Card from "../ui/Card";
import StyleItem from "../../css/MeetupItem.module.css";
import FavoritesContext from "../../store/favorites";

function MeetupItem(props) {
  const favoriteContex = useContext(FavoritesContext);

  const itemIsFavorite = favoriteContex.itemIsFavorite(props.item.id);

  function toggleFavorite() {
    if (itemIsFavorite) {
      favoriteContex.removeFavorite(props.item.id);
    } else {
      favoriteContex.addFavorite(props.item);
    }
  }

  return (
    <div className={StyleItem.item}>
      <Card>
        <div className={StyleItem.image}>
          <img src={props.item.img} alt={props.item.title} />
        </div>
        <div>
          <h3>{props.item.title}</h3>
          <address>{props.item.address}</address>
          <p>{props.item.description}</p>
        </div>
        <div className={StyleItem.actions}>
          <button onClick={toggleFavorite}>{itemIsFavorite? 'It is ': 'Add to '} favorite</button>
        </div>
      </Card>
    </div>
  );
}
export default MeetupItem;
