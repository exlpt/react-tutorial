import styleClasses from "../../styles/meetup/NewMeetupForm.module.css";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../ui/Card.js";

function NewMeetupForm(props) {
	const navigate = useNavigate();

  const titleRef = useRef();
  const imageRef = useRef();
  const addressRef = useRef();
  const descriptionRef = useRef();

  function sendFormData(event) {
    event.preventDefault();

    fetch(
      "https://react-tutorial-1-48ab8-default-rtdb.firebaseio.com/meetups.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleRef.current.value,
          image: imageRef.current.value,
          address: addressRef.current.value,
          description: descriptionRef.current.value,
        }),
      }
    ).then(() => {
			navigate("/");
		});
  }

  return (
    <Card>
      <form className={styleClasses.form} onSubmit={sendFormData}>
        <div className={styleClasses.control}>
          <label htmlFor="title">Meetup title</label>
          <input id="title" ref={titleRef} type="text" required />
        </div>

        <div className={styleClasses.control}>
          <label htmlFor="image">Meetup image</label>
          <input id="image" ref={imageRef} type="url" required />
        </div>

        <div className={styleClasses.control}>
          <label htmlFor="address">Meetup address</label>
          <input id="address" ref={addressRef} type="text" required />
        </div>

        <div className={styleClasses.control}>
          <label htmlFor="description">Meetup description</label>
          <textarea id="description" ref={descriptionRef} rows="5" required />
        </div>

        <div className={styleClasses.actions}>
          <button>Add</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
