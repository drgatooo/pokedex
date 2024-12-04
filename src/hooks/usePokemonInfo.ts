import { useEffect, useState } from 'react';
import { pokedex } from '../lib/pokedex';
import type { Pokemon } from 'pokeapi-js-wrapper';

export default function usePokemonInfo(name: string) {
  const [pokemonInfo, setPokemonInfo] = useState<Pokemon>();

  useEffect(() => {
    pokedex.getPokemonByName(name).then(pokemon => {
      setPokemonInfo(pokemon);
      console.log(pokemon)
    });
  }, [name]);

  return pokemonInfo;
}
