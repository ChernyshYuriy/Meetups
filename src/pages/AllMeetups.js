import { useEffect, useContext } from "react";
import MeetupList from "../components/Meetup/MeetupList";
import MeetupsContext from "../store/meetUpsState";
// import MeetupItem from "../components/Meetup/MeetupItem";
// import StyleItem from "../css/MeetupList.module.css";

// const DUMMY_DATA = [
//   {
//     id: "m1",
//     title: "This is a first meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Meetupstreet 5, 12345 Meetup City",
//     description:
//       "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
//   },
//   {
//     id: "m2",
//     title: "This is a second meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Meetupstreet 5, 12345 Meetup City",
//     description:
//       "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
//   },
// ];

function AllMeetupsPage() {
  const AllMeetups = useContext(MeetupsContext);

  // const [loadingData, setLoading] = useState(true);

  // const [dataMeetups, setDataMeetups] = useState([]);

  useEffect(() => {
    AllMeetups.getMeetup();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const getMeetup = AllMeetups.getMeetup;

  //console.log(AllMeetups.meetups);

  // setLoading(true);
  // fetch("https://walker-meetings-default-rtdb.europe-west1.firebasedatabase.app/meetups.json")
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     let newData = [];
  //     for (const key in data) {
  //       const meetup = {
  //         id: key,
  //         ...data[key],
  //       };
  //       newData.push(meetup);
  //     }
  //     console.log(newData, "newData");
  //     setLoading(false);
  //     console.log(newData);
  //     setDataMeetups(newData);
  //   });

  // console.log(AllMeetups.getMeetup);

  // console.log(AllMeetups);

  // function deleteMeetup(id) {
  //   console.log(id);
  //   const newData = dataMeetups.filter((meetup) => meetup.id !== id);
  //   console.log(newData);
  //   fetch(
  //     `https://walker-meetings-default-rtdb.europe-west1.firebasedatabase.app/meetups.json`,
  //     {
  //       method: "PUT",
  //       body: JSON.stringify(newData),
  //       headers: {
  //         "Content-Type": "application.json",
  //       },
  //     }
  //   ).then((response) => {
  //     console.log(response);
  //     setDataMeetups(newData);
  //   });
  // }

  if (!AllMeetups.loaded) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <h2>All Meetups</h2>
      {/* <ul>
      {DUMMY_DATA.map((item) => {
        return (
        <li key={item.id}>{item.title}</li>)
      })}
      </ul> */}
      {/* <ul className={StyleItem.list}>
        {AllMeetups.meetups.map((item) => {
          return (
            <MeetupItem
              deleteMeetup={AllMeetups.removeMeetup}
              key={item.id}
              item={item}
            />
          );
        })}
      </ul> */}
      <MeetupList items={AllMeetups.meetups} />
      {/* <MeetupList items={dataMeetups} /> */}
    </div>
  );
}
export default AllMeetupsPage;
