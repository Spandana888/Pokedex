import { Modal } from "react-bootstrap";
import './style.css';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import '../../App.css';
import axios from "axios";
import React, { useEffect, useState} from "react";
import Progress from "./Progress";
import EvolutionCard from "./EvolutionCard";

const PokemonModal = ({
  pokemon,
  name,
  id,
  image,
  height,
  weight,
  abilities,
  types,
  close,
  stats,
  statsName
}) => {
  const [description, setDescription] = useState([]);
  const [eggGroups, setEggGroups] = useState([]);
  const [weakList, setWeakList] = useState([]);
  const [evolutionSpecies, setEvolutionSpecies] = useState([]);
 const [evolutionChainURL, setEvolutionChainURL] = useState("");

  useEffect(() => {
    fetchDetails();
    fetchWeakList();
  }, []);

  useEffect(() => {
    fetchEvolutionDetails();
  }, [evolutionChainURL]);

  // flavor text
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
            setEvolutionChainURL(res.data.evolution_chain.url);
            setDescription(modifyDescription(res.data.flavor_text_entries));
            setEggGroups(res.data.egg_groups);
    });
  };

  //fetching weaklist from API
  const fetchWeakList = () => {
    axios
      .get(`https://pokeapi.co/api/v2/type/${id}`)
      .then((res) =>
        setWeakList(res?.data.damage_relations?.double_damage_from)
      );
  };

  //fetching evolutionspecies 

  const fetchEvolutionDetails = () => {
    axios.get(`${evolutionChainURL}`).then((res) => {
      setEvolutionSpecies(assignEvolutionSpecies(res));
    });
  };
 
  const assignEvolutionSpecies = (res) => {
    const arr = [];
    arr.push(res?.data?.chain?.species);
    arr.push(res?.data?.chain?.evolves_to[0].species);
    arr.push(res?.data?.chain?.evolves_to[0].evolves_to[0].species);
    return arr;
  };


  return (
    <div className="modal-container">
      <Modal.Header className="modal-head">
        <div
          className={
            pokemon.types.length > 1
              ? `headerLeft-component ${pokemon.types
                  .map((el) => el.type.name)
                  .join("-")}`
              : `headerLeft-component ${pokemon.types.map(
                  (el) => el.type.name
                )}`
          }
        >
          <img className="modal-image" src={image} alt={id}></img>
        </div>
        <div className="headerRight-component">
          <div className="modal-header-title">
            <h2>{name.toUpperCase()}</h2>
            <hr />
            <p>{id > 9 ? `0${id}` : `00${id}`}</p>
            <hr />
            <div className="header-button">
              <button className="arrow">
                <AiOutlineArrowLeft />
              </button>
              <button
                onClick={() => {
                  close(true);
                }}
              >
                X
              </button>
              <button className="arrow">
                <AiOutlineArrowRight />
              </button>
            </div>
          </div>
          <div className="description">
            <span>{description}</span>
            <p>read more</p>
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
              {weakList.map((element, index) => (
                <span key={index} className={element.name}>
                  {element.name}
                </span>
              ))}
            </p>
          </li>
          <li></li>
        </div>
        <div className="stat-container">
          <h5>Stats</h5>
          {stats.map((el) => (
            <div className="stat-list">
              <span>
                {el.stat.name.charAt(0).toUpperCase() + el.stat.name.slice(1)}
              </span>
              <Progress done={el.base_stat} />
            </div>
          ))}
        </div>
        <div>
          {evolutionSpecies.length > 0 && (
            <EvolutionCard evolutionSpecies={evolutionSpecies} />
          )}
        </div>
      </Modal.Body>
    </div>
  );
};

export default PokemonModal