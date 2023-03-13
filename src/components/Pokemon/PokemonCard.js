import React, { useState } from "react";
import './style.css';
import { Modal } from "react-bootstrap";
import PokemonModal from "../Pokemon/PokemonModal";

function PokemonCard({ pokemon, type}) {
  const [show, setShow] = useState(false);

  const handleShow = (e) => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div
        className={type}
        onClick={(e) => handleShow(e.target.value)}
        id="card"
        data-testid="card"
      >
        <img
          className="card-img-top"
          src={pokemon.sprites.front_default}
          alt={pokemon.id}
          data-testid = "card-image"
        />
        <div className="card-body">
          <p className="card-text">
            <strong>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </strong>
          </p>
          <p className="card-text">{pokemon.id > 9 ? `0${pokemon.id}` : `00${pokemon.id}`}</p>
        </div>
      </div>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        className="modal-container"
      >
        <PokemonModal
          close= {()=> {handleClose()}}
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.sprites.front_default}
          height={pokemon.weight}
          weight={pokemon.weight}
          abilities={pokemon.abilities.map((abilitiesList, index) => {
            return <span key="index">{abilitiesList.ability.name}</span>;
          })}
          types={pokemon.types.map((typeList) => {
            return (
              <span key={typeList.type.name} className={typeList.type.name}>
                {typeList.type.name}
              </span>
            );
          })}
        />
      </Modal>
    </>
  );
}

export default PokemonCard