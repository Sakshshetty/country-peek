import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CountryPage from "./pages/CountryPage";
import Favourites from "./pages/Favourites";
import NotFound from "./pages/NotFound";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      {/* Header should be outside Routes so it shows on all pages */}
      <Header />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Country Detail Page */}
        <Route path="/country/:code" element={<CountryPage />} />

        {/* Favourites Page */}
        <Route path="/favourites" element={<Favourites />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;