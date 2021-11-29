import { useRef, useEffect } from "react";

import StylesElem from "../css/NewMeetupForm.module.css";
import Card from "./ui/Card";

function Form(props) {
  const TitleRef = useRef();
  const ImgRef = useRef();
  const AddressRef = useRef();
  const DescRef = useRef();
  const MapLinkRef = useRef();
  const DateRef = useRef();
  const TimeRef = useRef();

  useEffect(() => {
    if (!!props.editData) {
      TitleRef.current.value = props.editData.title;
      ImgRef.current.value = props.editData.img;
      AddressRef.current.value = props.editData.address;
      DescRef.current.value = props.editData.desc;
      MapLinkRef.current.value = props.editData.mapLink;
      DateRef.current.value = props.editData.date
      TimeRef.current.value = props.editData.time
    }
  });
  // setTimeout(() => {

  // });

  function submitHandler(e) {
    e.preventDefault();
    const enteredTitle = TitleRef.current.value;
    const enteredImg = ImgRef.current.value;
    const enteredAddress = AddressRef.current.value;
    const enteredDesc = DescRef.current.value;
    const enteredMapLink = MapLinkRef.current.value;
    const enteredDate = DateRef.current.value
    const enteredTime = TimeRef.current.value

    //console.log(enteredDate, enteredTime);
    console.log(enteredTime);
    const meetupData = {
      title: enteredTitle,
      img: enteredImg,
      address: enteredAddress,
      desc: enteredDesc,
      mapLink: enteredMapLink,
      date: enteredDate,
      time: enteredTime
    };
    // console.log(meetupData);
    props.onChangeMeetup(meetupData);
  }

  return (
    <Card>
      <form
        id="new-meetup-form"
        className={StylesElem.form}
        onSubmit={submitHandler}
      >
        <div className={StylesElem.control}>
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            id="title"
            placeholder="Title"
            ref={TitleRef}
          />
        </div>
        <div className={StylesElem.control}>
          <label htmlFor="image">Image</label>
          <input
            required
            type="url"
            id="image"
            placeholder="Image"
            ref={ImgRef}
          />
        </div>
        <div className={StylesElem.control}>
          <label htmlFor="address">Address</label>
          <input
            required
            type="text"
            id="address"
            placeholder="Address"
            ref={AddressRef}
          />
        </div>
        <div className={StylesElem.control}>
          <label htmlFor="map">Link Map</label>
          <input type="text" id="map" placeholder="Map" ref={MapLinkRef} />
        </div>
        <div className={StylesElem.control}>
          <label htmlFor="description">Description</label>
          <textarea
            className={StylesElem.textarea}
            type="text"
            id="description"
            row="5"
            placeholder="Description"
            ref={DescRef}
          />
        </div>
        <div className={StylesElem.control}>
          <label htmlFor="address">Select date</label>
          <input
            className={StylesElem['short-input']}
            type="date"
            id="date"
            placeholder="Date"
            ref={DateRef}
          />
        </div>
        <div className={StylesElem.control}>
          <label htmlFor="address">Select time</label>
          <input
            className={StylesElem['short-input']}
            type="time"
            id="time"
            placeholder="Time"
            ref={TimeRef}
          />
        </div>
        <div className={StylesElem.actions}>
          <button>{props.btnText}</button>
        </div>
      </form>
    </Card>
  );
}

export default Form;
