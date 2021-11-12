import { useRef } from "react";

import StylesElem from "../css/NewMeetupForm.module.css";
import Card from "./ui/Card";

function Form(props) {
  const TitleRef = useRef()
  const ImgRef = useRef()
  const AddressRef = useRef()
  const DescRef = useRef()
  const MapLinkRef = useRef()


  


  function submitHandler(e) {
    e.preventDefault();
    const enteredTitle = TitleRef.current.value;
    const enteredImg = ImgRef.current.value;
    const enteredAddress = AddressRef.current.value;
    const enteredDesc = DescRef.current.value;
    const enteredMapLink = MapLinkRef.current.value;


    

    const meetupData ={
      title: enteredTitle,
      img: enteredImg,
      address: enteredAddress,
      desc: enteredDesc,
      mapLink : enteredMapLink
    }
    // console.log(meetupData);
    props.onAddMeetup(meetupData)
  }

  return (
    <Card>
      <form className={StylesElem.form} onSubmit={submitHandler}>
        <div className={StylesElem.control}>
          <label htmlFor="title">Title</label>
          <input required type="text" id="title" placeholder="text" ref={TitleRef}/>
        </div>
        <div className={StylesElem.control}>
          <label htmlFor="image">Image</label>
          <input required type="url" id="image" placeholder="image" ref={ImgRef} />
        </div>
        <div className={StylesElem.control}>
          <label htmlFor="address">Address</label>
          <input required type="text" id="address" placeholder="address" ref={AddressRef} />
        </div>
        <div className={StylesElem.control}>
          <label htmlFor="address">Link Map</label>
          <input required type="text" id="address" placeholder="Map link" ref={MapLinkRef} />
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
        <div className={StylesElem.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default Form;
