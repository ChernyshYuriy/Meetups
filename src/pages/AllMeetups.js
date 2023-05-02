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

  if (!AllMeetups.loaded) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <h2>All Meetups</h2>
      <MeetupList items={AllMeetups.meetups} />
    </div>
  );
}
export default AllMeetupsPage;
