import { createContext, useState } from "react";
import { main } from "../constants/api";
const MeetupsContext = createContext({
  meetups: [],
  loaded: {
    status: true,
    preloaderText: "",
  },
  editingMeetup: 0,
  isAdmin: false,
  getMeetup: (meetup) => {},
  addMeetup: (meetup) => {},
  removeMeetup: (meetupId) => {},
  editMeetup: (meetupId) => {},
  editRequest: (meetupId) => {},
  setAdminModalOpen: () => {},
  getSavedAdmin: () => {},
  logout: () => {},
});

export function MeetupsContextProvider(props) {
  const [allMeetups, setAllMeetups] = useState([]);
  const [allLoaded, setLoading] = useState({
    status: true,
    preloaderText: "",
  });
  const [editingMeetup, setEditingMeetup] = useState(null);
  const [isAdminStatus, setAdminStatus] = useState(false);
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);

  const context = {
    meetups: allMeetups,
    loaded: allLoaded,
    isAdmin: isAdminStatus,
    isAdminModalOpen: isAdminModalOpen,
    editingMeetup: editingMeetup,
    getMeetup: meetupGetter,
    addMeetup: addMeetupHandler,
    removeMeetup: removeMeetupHandler,
    editMeetup: editMeetupHandler,
    editRequest: editMeetupHandlerRequest,
    changeAdminStatus: changeAdminStatus,
    setAdminModalOpen: changeAdminModalStatus,
    getSavedAdmin,
    logout,
  };

  function meetupGetter() {
    changeLoadingStatus(false, "Getting meetups from server");
    fetch(main)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let newData = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          newData.push(meetup);
        }
        setLoading({
          status: true,
          preloaderText: "Getting data from server",
        });
        setAllMeetups(newData);
        (() => {
          const searchMeetup = document.querySelector("#searchedMeetup");
          if (searchMeetup && searchMeetup.offsetTop) {
            setTimeout(() => {
              window.scroll(0, searchMeetup.offsetTop - 10);
            }, 500);
          }
        })();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally((_) => changeLoadingStatus());
  }

  function addMeetupHandler(data) {
    changeLoadingStatus(false, "Adding meetup");

    fetch(main, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application.json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const NewMeetup = { ...data, id: response.name };
        const newData = [];
        allMeetups.forEach((meetup) => {
          newData.push(meetup);
        });
        newData.push(NewMeetup);

        setAllMeetups(newData);
        //nav('/')
        document.getElementById("new-meetup-form").reset();
      })
      .catch((err) => console.error(err))
      .finally((_) => changeLoadingStatus());
  }
  function removeMeetupHandler(meetupId) {
    changeLoadingStatus(false, "Removing meetup");
    const newData = allMeetups.filter((meetup) => meetup.id !== meetupId);

    fetch(main, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application.json",
      },
    })
      .then((response) => {
        setAllMeetups(newData);
      })
      .catch((err) => console.error(err))
      .finally((_) => changeLoadingStatus());
  }

  function editMeetupHandler(meetupId) {
    setEditingMeetup(allMeetups.filter((meetup) => meetup.id === meetupId)[0]);
  }

  function editMeetupHandlerRequest(editedMeetup) {
    changeLoadingStatus(false, "Saving changes in meetup");

    const newData = allMeetups.map((meetup) => {
      if (meetup.id === editingMeetup.id) {
        return {
          ...editedMeetup,
          id: editingMeetup.id,
        };
      } else {
        return meetup;
      }
    });

    fetch(main, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application.json",
      },
    })
      .then((response) => {
        setAllMeetups(newData);
        setEditingMeetup(editedMeetup);
      })
      .catch((err) => console.error(err))
      .finally((_) => changeLoadingStatus());
  }

  function changeLoadingStatus(
    status = true,
    preloaderText = "Connecting Server"
  ) {
    setLoading({
      status,
      preloaderText,
    });
  }

  function changeAdminStatus(code) {
    const date = new Date();
    const day = Number(date.getDate() < 10)
      ? `0${date.getDate()}`
      : date.getDate();
    const month = Number(date.getMonth() < 10)
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1;
    if (`${day}${month}` !== code) return;
    setAdminStatus(true);
    localStorage.setItem("adminSetDate", date.getTime());

    setAdminModalOpen(false);
  }

  function logout() {
    setAdminStatus(false);
    localStorage.removeItem("adminSetDate");
    setAdminModalOpen(false);
  }

  function changeAdminModalStatus(value) {
    setAdminModalOpen(value);
  }
  function getSavedAdmin() {
    const date = new Date();
    const lastLoginAdmin = JSON.parse(localStorage.getItem("adminSetDate"));
    date.setDate(date.getDate() - 1);
    if (lastLoginAdmin < date.getTime()) return;
    setAdminStatus(true);
  }

  return (
    <MeetupsContext.Provider value={context}>
      {props.children}
    </MeetupsContext.Provider>
  );
}
export default MeetupsContext;
