import { useFavourites } from "../context/FavouritesContext";

function CountryCard({ country }) {
  const { favourites, dispatch } = useFavourites();

  const isSaved = favourites.some((f) => f.cca3 === country.cca3);

  function handleFav(e) {
    e.stopPropagation();

    if (isSaved) {
      dispatch({ type: "REMOVE_FAVOURITE", payload: country.cca3 });
    } else {
      dispatch({ type: "ADD_FAVOURITE", payload: country });
    }
  }

  return (
    <div className="card">
      <img src={country.flags.svg} alt={country.name.common} />

      <div className="card__body">
        <h3>{country.name.common}</h3>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>

        <button
          className={`fav-btn ${isSaved ? "fav-btn--saved" : ""}`}
          onClick={handleFav}
        >
          {isSaved ? "♥ Saved" : "♡ Save"}
        </button>
      </div>
    </div>
  );
}

export default CountryCard;