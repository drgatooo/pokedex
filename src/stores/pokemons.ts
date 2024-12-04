import { map } from 'nanostores';
import type PokeAPI from 'pokeapi-js-wrapper';

export const pokemons = map<PokeAPI.NamedAPIResource[]>([]);
