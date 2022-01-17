import styleClasses from "../../styles/meetup/Meetup.module.css";

import { useContext, useState } from "react";

import Card from "../ui/Card.js";
import FavoritesContext from "../../store/favorites-context.js";

function Meetup(props) {
	const favoritesContext = useContext(FavoritesContext);

	const [meetupIsFavorite, setMeetupIsFavorite] = useState(null);
	favoritesContext.isFavorite(props.id, setMeetupIsFavorite);

	function toggleFavoriteStatus() {
		if (meetupIsFavorite)
			favoritesContext.removeFavorite(props.id);
		else
			favoritesContext.addFavorite({
				id: props.id,
				image: props.imgSrc,
				title: props.title,
				address: props.address,
				description: props.description,
			});
	}

  return (
    /* Returns an <li> element */
    <li className={styleClasses.item} key={props.id}>
      <Card>
        <div className={styleClasses.image}>
          <img src={props.imgSrc} alt={`${props.title} meetup`} />
        </div>

        <div className={styleClasses.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>

        <div className={styleClasses.actions}>
          <button onClick={toggleFavoriteStatus}>{meetupIsFavorite ? "Remove from favorites" : "Add to favorites"}</button>
        </div>
      </Card>
    </li>
  );
}

export default Meetup;
