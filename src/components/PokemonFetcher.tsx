import React from 'react';
import type { Pokemon } from 'pokeapi-js-wrapper';
import { pokedex } from '../lib/pokedex';
import Card from './Card';
import Spinner from './Spinner';
import { pokemonTypeColors } from '../constants/pokemonTypes';
import { isLight } from '../lib/utils';

export default function () {
  const [, setOffset] = React.useState(0);
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const [currentType, setType] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const fetchPokemons = async (offset: number) => {
    if (offset >= 1302) return;
    if (isLoading) return;

    setLoading(true);
    pokedex.getPokemonsList({ offset, limit: 30 }).then(async ({ results }) => {
      const pokemons = await Promise.all(results.map(({ name }) => pokedex.getPokemonByName(name)));
      setPokemons(prev => [...prev, ...pokemons]);
      setLoading(false);
    });
  };

  // if i scroll to the bottom of the page, fetch more pokemons
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
      console.log('fetching more pokemons');
      setOffset(prev => {
        fetchPokemons(prev);
        return prev + 30;
      });
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    setInterval(() => {
      handleScroll();
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 flex-wrap">
        {Object.entries(pokemonTypeColors).map(([type, color]) => (
          <span
            key={type}
            className="rounded-full px-2 py-1 text-xs font-mono font-bold cursor-pointer"
            style={{
              background: currentType === type ? color : 'transparent',
              color: currentType === type ? (isLight(color) ? 'black' : 'white') : color
            }}
            onClick={() => {
              setType(currentType === type ? '' : type);
              setPokemons([]);
              setOffset(0);
            }}
          >
            {type.toUpperCase()}
          </span>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {pokemons.filter(
          poke => !currentType || poke.types.some(({ type }) => type.name === currentType)
        ).length ? (
          pokemons
            .filter(
              poke => !currentType || poke.types.some(({ type }) => type.name === currentType)
            )
            .map(poke => <Card key={poke.name} pokemon={poke} />)
        ) : <></>}
        {(isLoading || !pokemons.filter(
          poke => !currentType || poke.types.some(({ type }) => type.name === currentType)
        ).length) ? (
          <div className="lg:col-span-3 sm:col-span-2 col-span-1">
            <Spinner />
          </div>
        ) : <span className="underline text-center lg:col-span-3 sm:col-span-2 col-span-1" onClick={() => {
          setOffset(prev => {
            fetchPokemons(prev);
            return prev + 30;
          });
        }}>
          Load more
        </span>}
      </div>
    </div>
  );
}
