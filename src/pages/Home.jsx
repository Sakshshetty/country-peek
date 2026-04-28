import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import CountryCard from "../components/CountryCard";

function Home() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("All");
  const [sortBy, setSortBy] = useState("");

  const trimmedQuery = query.trim();

  useEffect(() => {
    if (!trimmedQuery) {
      setCountries([]);
      return;
    }

    fetch(`https://restcountries.com/v3.1/name/${trimmedQuery}`)
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch(() => setCountries([]));
  }, [trimmedQuery]);

  const displayed = [...countries]
    .filter((c) => region === "All" || c.region === region)
    .sort((a, b) => {
      if (sortBy === "name")
        return a.name.common.localeCompare(b.name.common);
      if (sortBy === "population")
        return b.population - a.population;
      return 0;
    });

  return (
    <div className="home">
      <SearchBar query={query} onQueryChange={setQuery} />

      <FilterBar
        region={region}
        onRegionChange={setRegion}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {displayed.length === 0 ? (
        <p className="home__placeholder">No countries found</p>
      ) : (
        <div className="cards-grid">
          {displayed.map((c) => (
            <CountryCard key={c.cca3} country={c} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;