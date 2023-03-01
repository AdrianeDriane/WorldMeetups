import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";
import PropTypes from "prop-types";

function MeetupList({ meetups }) {
  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => (
        <MeetupItem
          address={meetup.address}
          description={meetup.description}
          id={meetup.id}
          image={meetup.image}
          key={meetup.id}
          title={meetup.title}
        />
      ))}
    </ul>
  );
}

MeetupList.propTypes = {
  meetups: PropTypes.array,
};
export default MeetupList;
