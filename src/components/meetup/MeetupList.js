import styleClasses from "../../styles/meetup/MeetupList.module.css";

import Meetup from "./Meetup.js";

function MeetupList(props) {
  return (
    <ul className={styleClasses.list}>

			{/* Returns an array of <Meetup> elements */}
      {props.list.map((item) => {
        return (
          <Meetup
            key={item.id}
						id={item.id}
            imgSrc={item.image}
            title={item.title}
            address={item.address}
            description={item.description}
          />
        );
      })}
    </ul>
  );
}

export default MeetupList;
