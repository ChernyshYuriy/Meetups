import { createContext, useState } from "react";


const FavoritesContext = createContext({
  meetups: [],
  loaded: false,
  editingMeetup: 0,
  getMeetup: (meetup) => {},
  addMeetup: (meetup) => {},
  removeMeetup: (meetupId) => {},
  editMeetup: (meetupId) => {},
});

export function FavoritesContextProvider(props) {
  const [allMeetups, setAllMeetups] = useState([]);
  const [allLoaded, setLoading] = useState(false);
  const [editingMeetup, setEditingMeetup] = useState(null);

  const context = {
    favorites: allMeetups,
    loaded: allLoaded,
    editingMeetup,
    getMeetup: addMeetupGetter,
    addFavorite: addMeetupHandler,
    removeFavorite: removeMeetupHandler,
    editMeetup: editMeetupHandler,
  };

  function addMeetupGetter(favorite) {
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
        console.log(newData, "newData");
        setLoading(false);
        console.log(newData);
        setAllMeetups(newData);
      });
  }

  function addMeetupHandler(data) {
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
      .then((resolve) => {
        //nav('/')
      })
      .catch((err) => console.log(err));
    // setAllMeetups((prevMeetups) => prevFavorites.concat(favorite));
  }
  function removeMeetupHandler(meetupId) {
    setAllMeetups((prevMeetups) => {
      const newData = prevMeetups.filter((meetup) => meetup.id !== meetupId);
      console.log(newData);
      fetch(
        `https://first-react-7b400-default-rtdb.firebaseio.com/meetups.json`,
        {
          method: "PUT",
          body: JSON.stringify(newData),
          headers: {
            "Content-Type": "application.json",
          },
        }
      ).then((response) => {
        console.log(response);
        return newData;
      });
    });
  }

  function editMeetupHandler(meetupId) {
    setEditingMeetup(allMeetups.filter((meetup) => meetup.id === meetupId));
  }

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}
export default FavoritesContext;
