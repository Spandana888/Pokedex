import React from 'react';
import "./Header.css";
import { BsFillCaretDownFill } from "react-icons/bs";
import { GrSearch } from "react-icons/gr"

function Header({filterPokemon}) {
  const strengthDropdown = (e) =>{
       var getDropdown = document.getElementById("strength-content");
       var getStrength = document.getElementById("strength-button");

       if (getDropdown.style.display === "block") {
         getDropdown.style.display = "none";
         getStrength.style.background = "#b9d0dc";
       } else {
         getDropdown.style.display = "block";
         getStrength.style.background = "#ffffff";
       }
  }

  return (
    <div className="header">
      <div className="header-one">
        <h1 data-testid="app-header">Pokédex</h1> <hr />
        <p data-testid="app-subtext">
          Search for any Pokémon that exists on the planet
        </p>
      </div>
      <div className="header-two">
        <div className="header-two-left">
          <div className="search-container" data-testid="app-search">
            <form role={"form"}>
              <label htmlFor="search"> Search by</label>
              <br />
              <input
                type="text"
                id="search-text"
                placeholder="Name or Number"
                aria-label="Search with name or number"
                onChange={(e) => filterPokemon(e.target.value)}
              />
              <GrSearch />
            </form>
          </div>
        </div>
        <div className="header-two-right">
          <div className="strength-filter">
            <form>
              <label htmlFor="search">Type</label>
              <br />
              <button
                t
                id="strength-button"
                onClick={(e) => strengthDropdown(e.target.value)}
              >
                Noraml <strong>+ 5 More</strong>
                <BsFillCaretDownFill />
              </button>
            </form>
            <div id="strength-content">
              <form>
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      id="normal-type"
                      name="normal-type"
                      value="Normal"
                    />
                    <label htmlFor="normal-type">Normal</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="fighting-type"
                      name="fighting-type"
                      value="Fighting"
                    />
                    <label htmlFor="fighting-type">Fighting</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="flying-type"
                      name="flying-type"
                      value="Flying"
                    />
                    <label htmlFor="flying-type">Flying</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="poison-type"
                      name="poison-type"
                      value="Poison"
                    />
                    <label htmlFor="poison-type">Poison</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="ground-type"
                      name="ground-type"
                      value="Ground"
                    />
                    <label htmlFor="ground-type">Ground</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="rock-type"
                      name="rock-type"
                      value="Rock"
                    />
                    <label htmlFor="rock-type">Rock</label>
                  </li>
                </ul>
              </form>
            </div>
          </div>
          <div className="gender-filter">
            <label htmlFor="search">Gender</label>
            <br />
            <button id="gender-button">
              Male <strong>+ 2 More</strong>
              <BsFillCaretDownFill />
            </button>
          </div>
          <div className="stat-filter">
            <label htmlFor="search">Stats</label>
            <br />
            <button id="stat-button">
              HP <strong>+ 5 More</strong>
              <BsFillCaretDownFill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;