import { useState, useEffect } from "react";

function TestModulPWE() {
  let [showList, editList] = useState([]);
  const List = [];
  // let [List, setList] = useState([]);
  const getUserLocation = (onSuccess) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, (error) => {
        console.error(error);
      });
    } else {
      console.log("Browser doesn't support Geolocation");
    }
  };
  function trackerList() {
    setTimeout(() => {
      saveCoordinates();
    }, 15000);
    // setInterval(() => {
    //   this.saveCoordinates();
    // }, 10000);
  }

  const saveLocation = async (location, time) => {
    await List.push({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      time,
    });
    const newVal = [...List];
    editList(newVal);
  };

  async function saveCoordinates() {
    const date = new Date();
    const time = date.toLocaleTimeString();
    console.log(showList, `List`);

    getUserLocation((location) => saveLocation(location, time));
    console.log(List, `list2`);
    await trackerList();
  }
  useEffect(() => {
    trackerList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{`${showList.map((item) => item.time)}`}</div>;
}

export default TestModulPWE;
