import MeetupItem from "./MeetupItem";
import StyleItem from "../../css/MeetupList.module.css";
import MeetupsContext from "../../store/meetUpsState";
import { useContext } from "react";

function MeetupList(props) {
  const AllMeetups = useContext(MeetupsContext);

  return (
    <ul className={StyleItem.list}>
      {props.items.map((item) => {
        return (
          <MeetupItem
            deleteMeetup={AllMeetups.removeMeetup}
            key={item.id}
            item={item}
          />
        );
      })}
    </ul>
  );
}
export default MeetupList;
