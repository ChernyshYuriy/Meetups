import { useRef, useState } from "react";

import StylesElem from "../css/NewMeetupForm.module.css";
import Card from "./ui/Card";

function Form(props) {
  const [showMeepPlaceMap, setShowMeepPlaceMap] = useState(false);

  function showInputMap() {
    setShowMeepPlaceMap(!showMeepPlaceMap);
  }

  const TitleRef = useRef();
  const ImgRef = useRef();
  const AddressRef = useRef();
  const DescRef = useRef();
  const MapLinkRef = useRef();
  const MapMarkerLat = useRef();
  const MapMarkerLng = useRef();
  const MeetPlaceName = useRef();

  function submitHandler(e) {
    e.preventDefault();
    const enteredTitle = TitleRef.current.value;
    const enteredImg = ImgRef.current.value;
    const enteredAddress = AddressRef.current.value;
    const enteredDesc = DescRef.current.value;
    const enteredMapLink = MapLinkRef.current.value;
    let enteredMeetPlaceName = null
    let enteredMapDataLat = null
    let enteredMapDataLng = null
    if (showMeepPlaceMap === true) {
      enteredMeetPlaceName = MeetPlaceName.current.value;
      enteredMapDataLat = MapMarkerLat.current.value;
      enteredMapDataLng = MapMarkerLng.current.value;
    }


    let meetupData = {
      title: enteredTitle,
      img: enteredImg,
      address: enteredAddress,
      desc: enteredDesc,
      mapLink: enteredMapLink,
    };
    if (showMeepPlaceMap === true) {
      meetupData = {
        ...meetupData,
        map: {
          meetPlace: enteredMeetPlaceName,
          mapData: {
            lat: enteredMapDataLat,
            lng: enteredMapDataLng,
          },
        },
      };
    }

    // console.log(meetupData);
    console.log(meetupData);
    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={StylesElem.form} onSubmit={submitHandler}>
        <div className={StylesElem.control}>
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            id="title"
            placeholder="text"
            ref={TitleRef}
          />
        </div>
        <div className={StylesElem.control}>
          <label htmlFor="image">Image</label>
          <input
            required
            type="url"
            id="image"
            placeholder="image"
            ref={ImgRef}
          />
        </div>
        <div className={StylesElem.control}>
          <label htmlFor="address">Address</label>
          <input
            required
            type="text"
            id="address"
            placeholder="address"
            ref={AddressRef}
          />
        </div>
        <div className={StylesElem.control}>
          <label htmlFor="address">Link Map</label>
          <input
            required
            type="text"
            id="address"
            placeholder="Map link"
            ref={MapLinkRef}
          />
        </div>
        <div className={StylesElem.control}>
          <label htmlFor="description">Description</label>
          <textarea
            required
            type="text"
            id="description"
            row="5"
            placeholder="description"
            ref={DescRef}
          />
        </div>
        <div className={StylesElem.control}>
          <label htmlFor="map">
            Add meet place ?{" "}
            <input
              onChange={showInputMap}
              type="checkbox"
              id="map"
              name="map"
            ></input>
          </label>
          {showMeepPlaceMap ? (
            <div>
              <div className={StylesElem.control}>
                <label htmlFor="MeetPlaceName">Meet Place Name</label>

                <input
                  required
                  type="text"
                  id="MeetPlaceName"
                  placeholder="Place name"
                  ref={MeetPlaceName}
                />
              </div>
              <div className={StylesElem.control}>
                <label htmlFor="MapMarkerLat">Map Lat</label>

                <input
                  required
                  type="text"
                  id="MapMarkerLat"
                  placeholder="Marker Lat"
                  ref={MapMarkerLat}
                />
              </div>

              <label htmlFor="MapMarkerLng">Map Lng</label>
              <div className={StylesElem.control}>
                <input
                  required
                  type="text"
                  id="MapMarkerLng"
                  placeholder="Marker Lng"
                  ref={MapMarkerLng}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className={StylesElem.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default Form;
