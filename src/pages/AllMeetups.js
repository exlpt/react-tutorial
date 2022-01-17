import { useState, useEffect } from "react";

import MeetupList from "../components/meetup/MeetupList.js";

function PageAllMeetups() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
		setIsLoading(true);
    fetch(
      "https://react-tutorial-1-48ab8-default-rtdb.firebaseio.com/meetups.json"
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
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>All Meetups</h1>

      {isLoading ? (
        <p>m8 its loading hold on</p>
      ) : (
        <MeetupList list={loadedMeetups} />
      )}
    </div>
  );
}

export default PageAllMeetups;
