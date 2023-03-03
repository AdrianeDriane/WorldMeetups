import { createContext, useState } from "react";
import PropTypes from "prop-types";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
});

export function FavoritesContextProvider({ children }) {
  const [userFavorites, setUserFavorites] = useState([]);

  fetch("https://reactmeetup-ce733-default-rtdb.firebaseio.com/favorites.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const favMeetups = [];

      for (const key in data) {
        const faveMeetup = {
          id: key,
          ...data[key],
        };

        favMeetups.push(faveMeetup);
      }

      setUserFavorites(favMeetups);
    });

  function addFavoriteHandler(favoriteMeetup) {
    fetch(
      "https://reactmeetup-ce733-default-rtdb.firebaseio.com/favorites.json",
      {
        method: "POST",
        body: JSON.stringify(favoriteMeetup),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  function removeFavoriteHandler(favoriteMeetup) {
    fetch(
      "https://reactmeetup-ce733-default-rtdb.firebaseio.com/favorites.json",
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch favorites.");
      })
      .then((data) => {
        for (const key in data) {
          if (data[key].id === favoriteMeetup.id) {
            fetch(
              `https://reactmeetup-ce733-default-rtdb.firebaseio.com/favorites/${key}.json`,
              {
                method: "DELETE",
              }
            );
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesContextProvider.propTypes = {
  children: PropTypes.node,
};

export default FavoritesContext;
