import { createContext, useState } from "react";

const MeetupsContext = createContext({
  meetups: [],
  loaded: false,
  editingMeetup: 0,
  getMeetup: (meetup) => {},
  addMeetup: (meetup) => {},
  removeMeetup: (meetupId) => {},
  editMeetup: (meetupId) => {},
  editRequest: (meetupId) => {},
});

export function MeetupsContextProvider(props) {
  const [allMeetups, setAllMeetups] = useState([]);
  const [allLoaded, setLoading] = useState(false);
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
    // console.log(1);
    fetch("https://walker-meetings-default-rtdb.europe-west1.firebasedatabase.app/meetups.json")
      .then((response) => {
        //console.log(1111);
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
        setLoading(true);
        // console.log(newData);
        setAllMeetups(newData);

        (() => {const searchMeetup = document.querySelector("#searchedMeetup");
        if (searchMeetup && searchMeetup.offsetTop) {
          setTimeout(() => {
            window.scroll(0, searchMeetup.offsetTop - 10)
          }, 500);
        }})()
      });
  }

  function addMeetupHandler(data) {
    fetch(
      "https://walker-meetings-default-rtdb.europe-west1.firebasedatabase.app/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application.json",
        },
      }
    )
      .then((resolve) => {
        //nav('/')
        document.getElementById("new-meetup-form").reset();
      })
      .catch((err) => console.error(err));
    // setAllMeetups((prevMeetups) => prevFavorites.concat(favourite));
  }
  function removeMeetupHandler(meetupId) {
    const newData = allMeetups.filter((meetup) => meetup.id !== meetupId);
    // console.log(allMeetups);

    fetch(
      `https://walker-meetings-default-rtdb.europe-west1.firebasedatabase.app/meetups.json`,
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
  }

  function editMeetupHandler(meetupId) {
    setEditingMeetup(allMeetups.filter((meetup) => meetup.id === meetupId)[0]);
  }

  function editMeetupHandlerRequest(editedMeetup) {
    // const newData = allMeetups.filter((meetup) => meetup.id !== meetupId);
    // console.log(allMeetups);

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
      `https://walker-meetings-default-rtdb.europe-west1.firebasedatabase.app/meetups.json`,
      {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application.json",
        },
      }
    ).then((response) => {
      setAllMeetups(newData);
      setEditingMeetup(editedMeetup)
    });
  }

  return (
    <MeetupsContext.Provider value={context}>
      {props.children}
    </MeetupsContext.Provider>
  );
}
export default MeetupsContext;
