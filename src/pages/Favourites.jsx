import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import CountryCard from "../components/CountryCard";

function Favourites() {
  const { favourites } = useFavourites();

  if (favourites.length === 0) {
    return (
      <div className="home">
        <h2>No favourites yet</h2>
        <Link to="/">Go back to Home</Link>
      </div>
    );
  }

  return (
    <div className="home">
      <h2>Favourites</h2>

      <div className="cards-grid">
        {favourites.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
}

export default Favourites;