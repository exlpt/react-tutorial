import { createContext, useState, useEffect } from "react";

const FavoritesContext = createContext({
  totalFavorites: 0,
  setTotalFavorites: null,

  addFavorite: null,
  removeFavorite: null,
  isFavorite: null,
});

export function FavoritesContextProvider(props) {
  const [totalFavoritesState, setTotalFavoritesState] = useState(-1);

  useEffect(() => {
    fetch(
      `https://react-tutorial-1-48ab8-default-rtdb.firebaseio.com/favorites.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setTotalFavoritesState(json === null ? 0 : Object.keys(json).length);
      });
  }, []);

  function addFavoriteFunction(meetup) {
    fetch(
      `https://react-tutorial-1-48ab8-default-rtdb.firebaseio.com/favorites.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: meetup.id,
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          description: meetup.description,
        }),
      }
    ).then(() => {
      setTotalFavoritesState((previousState) => {
        return previousState + 1;
      });
    });
  }

  function removeFavoriteFunction(meetupId) {
    fetch(
      "https://react-tutorial-1-48ab8-default-rtdb.firebaseio.com/favorites.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let newFavorites = {};
        for (const favorite in json) {
          if (json[favorite].id !== meetupId)
            newFavorites[favorite] = json[favorite];
        }

        fetch(
          `https://react-tutorial-1-48ab8-default-rtdb.firebaseio.com/favorites.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newFavorites),
          }
        ).then(() => {
          setTotalFavoritesState((previousState) => {
            return previousState - 1;
          });
        });
      });
  }

  function isFavoriteFunction(meetupId, outSetFunction) {
    fetch(
      `https://react-tutorial-1-48ab8-default-rtdb.firebaseio.com/favorites.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let isFavorite = false;
        for (const favorite in json) {
          if (json[favorite].id === meetupId) isFavorite = true;
        }

        outSetFunction(isFavorite);
      });
  }

  return (
    <FavoritesContext.Provider
      value={{
        totalFavorites: totalFavoritesState,
        setTotalFavorites: setTotalFavoritesState,

        addFavorite: addFavoriteFunction,
        removeFavorite: removeFavoriteFunction,
        isFavorite: isFavoriteFunction,
      }}
    >
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
