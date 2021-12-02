import { createContext, useState } from "react";

const MeetupsContext = createContext({
  meetups: [],
  loaded: {
    status: true,
    preloaderText: "",
  },
  editingMeetup: 0,
  getMeetup: (meetup) => {},
  addMeetup: (meetup) => {},
  removeMeetup: (meetupId) => {},
  editMeetup: (meetupId) => {},
  editRequest: (meetupId) => {},
});

export function MeetupsContextProvider(props) {
  const [allMeetups, setAllMeetups] = useState([]);
  const [allLoaded, setLoading] = useState({
    status: true,
    preloaderText: "",
  });
  const [editingMeetup, setEditingMeetup] = useState(null);

  const context = {
    meetups: allMeetups,
    loaded: allLoaded,
    editingMeetup: editingMeetup,
    getMeetup: meetupGetter,
    addMeetup: addMeetupHandler,
    removeMeetup: removeMeetupHandler,
    editMeetup: editMeetupHandler,
    editRequest: editMeetupHandlerRequest,
  };

  function meetupGetter() {
    changeLoadingStatus(false, "Getting meetups from server");
    fetch("https://first-react-7b400-default-rtdb.firebaseio.com/meetups.json")
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
        // console.log(newData, "newData");
        setLoading({
          status: true,
          preloaderText: "Getting data from server",
        });
        // console.log(newData);
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

    fetch(
      "https://first-react-7b400-default-rtdb.firebaseio.com/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application.json",
        },
      }
    )
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
    // setAllMeetups((prevMeetups) => prevFavorites.concat(favourite));
  }
  function removeMeetupHandler(meetupId) {
    changeLoadingStatus(false, "Removing meetup");
    const newData = allMeetups.filter((meetup) => meetup.id !== meetupId);

    fetch(
      `https://first-react-7b400-default-rtdb.firebaseio.com/meetups.json`,
      {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application.json",
        },
      }
    )
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
    // const newData = allMeetups.filter((meetup) => meetup.id !== meetupId);
    // console.log(allMeetups);
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

    fetch(
      `https://first-react-7b400-default-rtdb.firebaseio.com/meetups.json`,
      {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application.json",
        },
      }
    )
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

  return (
    <MeetupsContext.Provider value={context}>
      {props.children}
    </MeetupsContext.Provider>
  );
}
export default MeetupsContext;
