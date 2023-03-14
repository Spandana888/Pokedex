import React, { useState } from "react";
import './style.css';
import { Modal } from "react-bootstrap";
import PokemonModal from "../Pokemon/PokemonModal";

function PokemonCard({ pokemon }) {
  const [show, setShow] = useState(false);

  const handleShow = (e) => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div
        className={pokemon.types.length > 1 ? `${pokemon.types.map((el)=> el.type.name).join("-")}` : `${pokemon.types.map((el)=> el.type.name)}`}
        onClick={(e) => handleShow(e.target.value)}
        id="card"
        data-testid="card"
      >
        <img
          className="card-img-top"
          src={pokemon.sprites.front_default}
          alt={pokemon.id}
          data-testid="card-image"
        />
        <div className="card-body">
          <p className="card-text">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </p>
          <p className="card-text-id">
            {pokemon.id > 9 ? `0${pokemon.id}` : `00${pokemon.id}`}
          </p>
        </div>
      </div>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        className="modal-container"
      >
        <PokemonModal
          close={() => {
            handleClose();
          }}
          pokemon={pokemon}
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.sprites.front_default}
          height={pokemon.weight}
          weight={pokemon.weight}
          abilities={pokemon.abilities
            .map((abilitiesList) => abilitiesList.ability.name)
            .join(", ")}
          types={pokemon.types.map((typeList) => (
            <span key={typeList.type.name} className={typeList.type.name}>
              {typeList.type.name}
            </span>
          ))}
          stats={pokemon.stats.map((stat) => stat)}
        />
      </Modal>
    </>
  );
}

export default PokemonCard