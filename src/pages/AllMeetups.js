import { useEffect, useContext } from "react";
import MeetupList from "../components/Meetup/MeetupList";
import MeetupsContext from "../store/meetUpsState";

function AllMeetupsPage() {
  const AllMeetups = useContext(MeetupsContext);
  useEffect(() => {
    if (!AllMeetups.meetups.length) {
      AllMeetups.getMeetup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const meetupsList = AllMeetups.isAdmin
    ? AllMeetups.meetups
    : AllMeetups.meetups.filter((meetup) => !meetup.isOnlyAdmins);

  if (!AllMeetups.loaded) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <h2>All Meetups</h2>
      <MeetupList items={meetupsList} />
    </div>
  );
}
export default AllMeetupsPage;
