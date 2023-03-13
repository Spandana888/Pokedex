import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import Header from "../../components/Header/Header.js"
import PokemonCard from '../../components/Pokemon/PokemonCard';

const Home = () => {
  const [pokemon, setPokemon] = useState([]);

  const getPokemons = async () => {
    var pokemonArr = [];
    for (var i = 1; i <=  20; i++) {
      pokemonArr.push(await getPokemonData(i));
    }
    setPokemon(pokemonArr);
    console.log(pokemonArr)
  };

  const getPokemonData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res;
  };

  useEffect(() => {
    getPokemons();
  }, []);

  //pokeman filter functionality
  const filterPokemon = (name) => {
    let pokemonArray = [];
    if (name === "") {
      getPokemons();
    }
    for (let i in pokemon) {
      if (pokemon[i].data.name.includes(name)) {
        pokemonArray.push(pokemon[i]);
      }
    }
    setPokemon(pokemonArray);
  };

  return (
    <>
      <Header filterPokemon={filterPokemon} />
      <div className="pokemon-card">
        {pokemon.map((list) => {
          return (
            <>
              <PokemonCard
                key={list.data.name}
                pokemon={list.data}
                type={list.data.types.map((typeList) => {
                  return (
                    typeList.type.name
                  );
                })}
              />
            </>
          );
        })}
      </div>
    </>
  );
}

export default Home