import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import PropTypes from "prop-types";

function MeetupItem({ address, description, id, image, key, title }) {
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
          <button>To Favorites</button>
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
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MeetupItem;
