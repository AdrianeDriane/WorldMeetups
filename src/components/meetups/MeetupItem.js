import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import PropTypes from "prop-types";
import { useContext } from "react";
import FavoritesContext from "../../store/favorites-context";

function MeetupItem({ address, description, id, image, title }) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(id);

  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite({
        id: id,
        title: title,
        description: description,
        image: image,
        address: address,
      });
    } else {
      favoritesCtx.addFavorite({
        id: id,
        title: title,
        description: description,
        image: image,
        address: address,
      });
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
          <p>{description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite ? "Remove From Favorites" : "To Favorites"}
          </button>
        </div>
      </Card>
    </li>
  );
}

MeetupItem.propTypes = {
  address: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MeetupItem;
