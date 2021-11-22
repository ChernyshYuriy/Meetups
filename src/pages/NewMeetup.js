import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import NewMeetupForm from "../components/NewMeetupForm";
import MeetupsContext from "../store/meetUpsState";

function NewMeetup() {


  const AllMeetups = useContext(MeetupsContext);

  // const nav = useNavigate();

  // function onAddMeetupHandler(data) {
  //   fetch(
  //     "https://first-react-7b400-default-rtdb.firebaseio.com/meetups.json",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       headers: {
  //         "Content-Type": "application.json",
  //       },
  //     }
  //   )
  //     .then((resolve) => {
  //       nav('/')
  //     })
  //     .catch((err) => console.log(err));
  // }
  return (
    <div>
      <h2>New Meetup</h2>
      <NewMeetupForm onChangeMeetup={AllMeetups.addMeetup} btnText="Add Meetup"/>
      
    </div>
  );
}
export default NewMeetup;
