import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";

const EvolutionChain = ({ evolutionSpecies }) => {
  const [evolutionSpeciesDetails, setEvolutionSpeciesDetails] = useState([]);
  useEffect(() => {
    getPokemonGenderList();
  }, [evolutionSpecies]);

  const getPokemonGenderList = async () => {
    let pokemonArray = [];
    const id = evolutionSpecies && evolutionSpecies.map((el) =>
        el.url.replace("pokemon-species", "pokemon")
      );

    for (let i = 0; i < id.length; i++) {
      pokemonArray.push(await getPokemonGender(id[i]));
    }
    setEvolutionSpeciesDetails(pokemonArray);
  };

  const getPokemonGender = async (id) => {
    const res = await axios.get(id);
    return res.data;
  };

  return (
    <div className="evolution">
      <p>
        <strong>Evolution Chain </strong>
      </p>
      <div className="evolution-container">
        {evolutionSpeciesDetails.map((el) => (
          <>
            <li
              className={
                el.types.length > 0
                  ? `evolution-card ${el.types
                      .map((el) => el.type.name)
                      .join("-")}`
                  : `evolution-card ${el.types.map((el) => el.types.name)}`
              }
            >
              <img
                src={el.sprites.front_default}
                // alt={name}
              />
              <p>
                <strong>
                  {el.name.charAt(0).toUpperCase() + el.name.slice(1)}
                </strong>
              </p>
              <p>{el.id > 9 ? `0${el.id}` : `00${el.id}`}</p>
            </li>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.0677 11.9929L18.818 7.75739L17.4061 9.17398L19.2415 11.0032L0.932469 11.0012L0.932251 13.0012L19.2369 13.0032L17.4155 14.8308L18.8321 16.2426L23.0677 11.9929Z"
                fill="currentColor"
              />
            </svg>
          </>
        ))}
      </div>
    </div>
  );
};

export default EvolutionChain;
