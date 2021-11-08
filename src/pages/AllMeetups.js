import { useState, useEffect } from "react";
import MeetupList from "../components/Meetup/MeetupList";
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
  const [loadingData, setLoading] = useState(true);

  const [dataMeetups, setDataMeetups] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://first-react-7b400-default-rtdb.firebaseio.com/meetups.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let newData = []
        for (const key in data) {
          const meetup ={
            id: key,
            ...data[key]
          }
          newData.push(meetup)

        }
        console.log(newData, 'newData');
        setLoading(false);
        console.log(data);
        setDataMeetups(newData);
      });
  }, []);

  if (!!loadingData) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <h1>All Meetups</h1>
      {/* <ul>
      {DUMMY_DATA.map((item) => {
        return (
        <li key={item.id}>{item.title}</li>)
      })}
      </ul> */}
      <MeetupList items={dataMeetups} />
    </div>
  );
}
export default AllMeetupsPage;
