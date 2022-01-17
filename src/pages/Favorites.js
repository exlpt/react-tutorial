import mainNavStyleClasses from "../styles/layout/MainNav.module.css";

import { useContext, useEffect, useState } from "react";

import FavoritesContext from "../store/favorites-context.js";
import MeetupList from "../components/meetup/MeetupList.js";

function PageFavorites() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  const favoritesContext = useContext(FavoritesContext);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://react-tutorial-1-48ab8-default-rtdb.firebaseio.com/favorites.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const meetups = [];
        for (let entry in json) {
          const meetup = {
            id: entry,
            ...json[entry],
          };
          meetups.push(meetup);
        }

        setLoadedMeetups(meetups);
				favoritesContext.setTotalFavorites(meetups.length);
        setIsLoading(false);
      });
  }, []);

  return (
    <section>
      <h1>
        Favorites{" "}
        <span className={mainNavStyleClasses.badge}>
          {favoritesContext.totalFavorites}
        </span>
      </h1>
      {isLoading ? (
        <p>m8 its loading hold on</p>
      ) : favoritesContext.totalFavorites !== 0 ? (
        <MeetupList list={loadedMeetups}></MeetupList>
      ) : (
        <p>No favorites!</p>
      )}
    </section>
  );
}

export default PageFavorites;
