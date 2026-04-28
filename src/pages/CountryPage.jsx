import { useParams, useNavigate } from "react-router-dom";
import useCountry from "../hooks/useCountry";
import "../styles/App.css";

function CountryPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  const { country, loading, error } = useCountry(code);

  //  Loading state
  if (loading) {
    return <p className="page-status">Loading country details...</p>;
  }

  //  Error state
  if (error) {
    return (
      <p className="page-status page-status--error">
         {error || "Failed to load country"}
      </p>
    );
  }

  //  Safety check
  if (!country) {
    return (
      <p className="page-status">
        No country data found.
      </p>
    );
  }

  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    languages,
    currencies,
    borders,
  } = country;

  // ✅ Handle missing values safely
  const languageList = languages ? Object.values(languages) : ["N/A"];
  const currencyList = currencies
    ? Object.values(currencies).map((c) => c.name)
    : ["N/A"];

  return (
    <div className="country-page">
      
      {/*  Accessible Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
        aria-label="Go back to previous page"
      >
        ← Back
      </button>

      <div className="country-page__layout">
        
        {/*  Flag Image */}
        <img
          src={flags?.svg}
          alt={`Flag of ${name?.common}`}
          className="country-page__flag"
        />

        <div className="country-page__info">
          
          {/*  Names */}
          <h2 className="country-page__name">
            {name?.common || "N/A"}
          </h2>
          <p className="country-page__official">
            {name?.official || "N/A"}
          </p>

          <div className="country-page__details">
            
            {/*  Left Column */}
            <div>
              <p>
                <strong>Population:</strong>{" "}
                {population ? population.toLocaleString() : "N/A"}
              </p>

              <p>
                <strong>Region:</strong> {region || "N/A"}
              </p>

              <p>
                <strong>Subregion:</strong> {subregion || "N/A"}
              </p>

              <p>
                <strong>Capital:</strong>{" "}
                {capital?.[0] || "N/A"}
              </p>
            </div>

            {/*  Right Column */}
            <div>
              <p>
                <strong>Languages:</strong>{" "}
                {languageList.join(", ")}
              </p>

              <p>
                <strong>Currencies:</strong>{" "}
                {currencyList.join(", ")}
              </p>
            </div>
          </div>

          {/*  Borders Section */}
          {borders && borders.length > 0 ? (
            <div>
              <strong>Borders:</strong>
              <div>
                {borders.map((b) => (
                  <span key={b} className="border-badge">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p>
              <strong>Borders:</strong> None
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryPage;