import NewMeetupForm from "../components/NewMeetupForm";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";

import MeetupsContext from "../store/meetUpsState";

function EditMeetup() {
  const AllMeetups = useContext(MeetupsContext);
  const nav = useNavigate();

  function editMeetupFunc(data) {
    new Promise((resolve, reject) => {
      AllMeetups.editRequest(data);
    }).then(
      setTimeout(() => {
        nav("/");
      })
    );
  }

  // function changeMeetupData(data) {
  //   AllMeetups.editRequest(data)
  //   // fetch(
  //   //   "https://walker-meetings-default-rtdb.europe-west1.firebasedatabase.app/meetups/" + JSON.stringify(AllMeetups.editingMeetup.id) +".json",
  //   //   {
  //   //     method: "PUT",
  //   //     body: JSON.stringify(data),
  //   //     headers: {
  //   //       "Content-Type": "application.json",
  //   //     },
  //   //   }
  //   // )
  //   //   .then((resolve) => {
  //   //     //nav('/')
  //   //     alert("Success")
  //   //   })
  //   //   .catch((err) => console.log(err));
  // }

  return (
    <NewMeetupForm
      onChangeMeetup={editMeetupFunc}
      btnText="Save changes"
      editData={AllMeetups.editingMeetup}
    />
  );
}
export default EditMeetup;
