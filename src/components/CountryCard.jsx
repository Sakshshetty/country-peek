import { Link } from "react-router-dom";
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
    <Link to={`/country/${country.cca3}`} className="card">
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />

      <div className="card__body">
        <h3 className="card__name">{country.name.common}</h3>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>

        <button
          className={`fav-btn ${isSaved ? "fav-btn--saved" : ""}`}
          aria-label={
            isSaved
              ? `Remove ${country.name.common} from favourites`
              : `Save ${country.name.common} to favourites`
          }
          aria-pressed={isSaved}
          onClick={handleFav}
        >
          {isSaved ? "♥ Saved" : "♡ Save"}
        </button>
      </div>
    </Link>
  );
}

export default CountryCard;