import { Modal } from "react-bootstrap";
import './style.css';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import '../../App.css';
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

const PokemonModal = ({
  name,
  id,
  image,
  height,
  weight,
  abilities,
  types,
  close
}) => {
  const [description, setDescription] = useState([]);
  const [eggGroups, setEggGroups] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  // flavot text
  const modifyDescription = (result) => {
    const englishDesc = result
      .filter((el) => el?.language?.name === "en")
      .map((el) => el.flavor_text);
    let concatDesc = englishDesc
      .filter((v, i) => englishDesc.indexOf(v) === i)
      .join(" ");
    return concatDesc;
  };

  // fetching API data from pokemon-species
  const fetchDetails = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => {
      //setEvolutionChainURL(res.data.evolution_chain.url);
      setDescription(modifyDescription(res.data.flavor_text_entries));
      setEggGroups(res.data.egg_groups);
    });
  };

  return (
    <div className="modal-container">
      <Modal.Header className="modal-head">
        <div className="headerLeft-component">
          <img className="modal-image" src={image} alt={id}></img>
        </div>
        <div className="headerRight-component">
          <div className="modal-header-title">
            <h2>
              <strong>{name.toUpperCase()}</strong>
            </h2>
            <hr />
            <h2>
              <p>{id > 9 ? `0${id}` : `00${id}`}</p>
            </h2>
            <div className="header-button">
              <button>
                <AiOutlineArrowLeft />
              </button>
              <button
                onClick={() => {
                  close(true);
                }}
              >
                X
              </button>
              <button>
                <AiOutlineArrowRight />
              </button>
            </div>
          </div>
          <div className="description">
            <span>{description}</span>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="attribute-container">
          <li className="height">
            <strong>Height</strong>
            <p>{(height / 10) * 3.28}</p>
          </li>
          <li className="weight">
            <strong>Weight</strong>
            <p>{weight / 10}</p>
          </li>
          <li className="gender">
            <strong>Gender(s)</strong>
            <p>Male, Female</p>
          </li>
          <li className="egg-groupes">
            <strong>Egg Groups</strong>
            <p>
              {eggGroups
                .map((element) => element.name)
                .map(
                  (element) =>
                    element.charAt(0).toUpperCase() + element.slice(1)
                )
                .join(", ")}
            </p>
          </li>
          <li className="abilities">
            <strong>Abilities</strong>
            <p>{abilities}</p>
          </li>
          <li className="types">
            <strong>Types</strong>
            <p>{types}</p>
          </li>
          <li className="weak-against">
            <strong>Weak Against</strong>
            <p>
              <span className="fighting">Fighting</span>
              <span className="ground">Ground</span>
              <span className="steel">Steel</span>
              <span className="water">Water</span>
              <span className="grass">Grass</span>
            </p>
          </li>
        </div>
        <div className="stat-container">
          <h5>Stats</h5>
          <div className="stat-list">
            <ul>
              <li>
                <span>HP</span>
                <div className="bar-stat">
                  <div className="stats hp-stats">78</div>
                </div>
              </li>
              <li>
                <span>Attack</span>
                <div className="bar-stat">
                  <div className="stats attack-stats">84</div>
                </div>
              </li>
              <li>
                <span>Defense</span>
                <div className="bar-stat">
                  <div className="stats defense-stats">78</div>
                </div>
              </li>
              <li>
                <span>Speed</span>
                <div className="bar-stat">
                  <div className="stats speed-stats">100</div>
                </div>
              </li>
              <li>
                <span>Sp.Attack</span>
                <div className="bar-stat">
                  <div className="stats spattack-stats">109</div>
                </div>
              </li>
              <li>
                <span>Sp.Def</span>
                <div className="bar-stat">
                  <div className="stats def-stats">85</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="evolution-container">
          <h5>Evolution Chain </h5>
          <div className="evolution-card">
            <div className="modal-card">
              <img className="card-img-top" src={image} alt={id} />
              <div className="card-body">
                <p className="card-text">
                  <strong>{name}</strong>
                </p>
                <p className="card-text">{id}</p>
              </div>
            </div>
            <span className="arrow-icon">
              <AiOutlineArrowRight />
            </span>
            <div className="modal-card">
              <img className="card-img-top" src={image} alt={id} />
              <div className="card-body">
                <p className="card-text">
                  <strong>{name}</strong>
                </p>
                <p className="card-text">{id}</p>
              </div>
            </div>
            <span className="arrow-icon">
              <AiOutlineArrowRight />
            </span>
            <div className="modal-card">
              <img className="card-img-top" src={image} alt={id} />
              <div className="card-body">
                <p className="card-text">
                  <strong>{name}</strong>
                </p>
                <p className="card-text">{id}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </div>
  );
};

export default PokemonModal