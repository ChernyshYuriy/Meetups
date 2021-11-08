import { useNavigate } from "react-router-dom";
import NewMeetupForm from "../components/NewMeetupForm";

function NewMeetup() {
  
  const nav = useNavigate();

  function onAddMeetupHandler(data) {
    fetch(
      "https://first-react-7b400-default-rtdb.firebaseio.com/meetups/-MnpuqyalmzlAVwGORPE.json",
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application.json",
        },
      }
    )
      .then((resolve) => {
        nav('/')
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <h2>New Meetup</h2>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
    </div>
  );
}
export default NewMeetup;
