import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

//Navbar
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">🏕️ Cohere Camping Creator</div>
      <div className="navbar-links">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/weather">
          <button>Weather</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
