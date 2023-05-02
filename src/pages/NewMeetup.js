import { useContext } from "react";
import NewMeetupForm from "../components/NewMeetupForm";
import MeetupsContext from "../store/meetUpsState";

function NewMeetup() {
  const AllMeetups = useContext(MeetupsContext);
  return (
    <div>
      <h2>New Meetup</h2>
      <NewMeetupForm
        onChangeMeetup={AllMeetups.addMeetup}
        btnText="Add Meetup"
      />
    </div>
  );
}
export default NewMeetup;
