import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import StylesElem from "../css/NewMeetupForm.module.css";
import Card from "./ui/Card";

function Form(props) {
  const nav = useNavigate();

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
      DateRef.current.value = props.editData.date;
      TimeRef.current.value = props.editData.time;
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
    const enteredDate = DateRef.current.value;
    const enteredTime = TimeRef.current.value;

    const meetupData = {
      title: enteredTitle,
      img: enteredImg,
      address: enteredAddress,
      desc: enteredDesc,
      mapLink: enteredMapLink,
      date: enteredDate,
      time: enteredTime,
    };
    props.onChangeMeetup(meetupData);
  }

  function cancelForm(e) {
    e.preventDefault();
    nav("/");
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
          <input type="url" id="image" placeholder="Image" ref={ImgRef} />
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
          <div className="row">
            <input type="text" id="map" placeholder="Map" ref={MapLinkRef} />
            <a
              className={StylesElem.map}
              href="https://www.google.com.ua/maps/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Google_Maps_icon_%282015-2020%29.svg/32px-Google_Maps_icon_%282015-2020%29.svg.png"
                alt=""
              />
            </a>
          </div>
          <div className={`${StylesElem.helping} row`}>
            <img className={StylesElem['exclamation-mark']} src="http://images.all-free-download.com/images/graphiclarge/warning_sign_clip_art_26217.jpg" alt=""/>
            Build your route using Google Maps.
          </div>
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
            className={StylesElem["short-input"]}
            type="date"
            id="date"
            placeholder="Date"
            ref={DateRef}
          />
        </div>
        <div className={StylesElem.control}>
          <label htmlFor="address">Select time</label>
          <input
            className={StylesElem["short-input"]}
            type="time"
            id="time"
            placeholder="Time"
            ref={TimeRef}
          />
        </div>
        <div className="form-btn-group">
          <div className={StylesElem.actions}>
            <button onClick={cancelForm}>Cancel</button>
          </div>
          <div className={StylesElem.actions}>
            <button>{props.btnText}</button>
          </div>
        </div>
      </form>
    </Card>
  );
}

export default Form;
