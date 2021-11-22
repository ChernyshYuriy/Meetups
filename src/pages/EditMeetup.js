import NewMeetupForm from "../components/NewMeetupForm";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";

import MeetupsContext from "../store/meetUpsState";

function EditMeetup() {
  const AllMeetups = useContext(MeetupsContext);
  console.log(AllMeetups.editingMeetup, "AllMeetups.editingMeetup");
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
  //   // console.log(AllMeetups.editingMeetup.id, 'AllMeetups.editingMeetup');
  //   // console.log({...data,id:AllMeetups.editingMeetup.id} == AllMeetups.editingMeetup, {...data,id:AllMeetups.editingMeetup.id} === AllMeetups.editingMeetup, 'data == AllMeetups.editingMeetup, data === AllMeetups.editingMeetup');
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
      btnText="Edit Meetup"
      editData={AllMeetups.editingMeetup}
    />
  );
}
export default EditMeetup;
