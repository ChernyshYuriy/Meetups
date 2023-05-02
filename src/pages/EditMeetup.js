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

  return (
    <NewMeetupForm
      onChangeMeetup={editMeetupFunc}
      btnText="Save changes"
      editData={AllMeetups.editingMeetup}
    />
  );
}
export default EditMeetup;
