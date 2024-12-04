import type { Pokemon } from 'pokeapi-js-wrapper';
import { pokemonTypeColors } from '../constants/pokemonTypes';
import { capitalize, isLight } from '../lib/utils';
import Pokeball from '../assets/pokeball.svg';

const defaultStyle = 'rounded-lg px-4 py-2 relative grid grid-cols-2 gap-y-2';

export default function ({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div
      className={defaultStyle}
      style={{
        background: `${
          pokemonTypeColors[
            (pokemon?.types[0].type.name ?? 'normal') as keyof typeof pokemonTypeColors
          ]
        }aa`
      }}
    >
      <div>
        <span className="font-bold text-black/40">#{pokemon.id}</span>
        <h1 className="font-extrabold text-2xl">{capitalize(pokemon.name)}</h1>
        <div className="mt-2">
          {pokemon.types.map(({ type }) => {
            const color = pokemonTypeColors[type.name as keyof typeof pokemonTypeColors];
            return (
            <span
              key={type.name}
              className="rounded-full px-2 py-1 text-xs font-mono font-bold mr-2"
              style={{ background: color, color: isLight(color) ? 'black' : 'white' }}
            >
              {type.name.toUpperCase()}
            </span>
          )})}
        </div>
      </div>
      <img
        className="aspect-square h-full max-h-24 justify-self-end"
        src={pokemon.sprites.front_default ?? Pokeball.src}
        alt={pokemon.name}
        onClick={() => {
          const audio = new Audio(pokemon.cries.latest);
          audio.play();
        }}
      />
      <div className='grid grid-cols-2 gap-y-1 gap-x-3 col-span-2'>
          {pokemon.stats.map(({ stat, base_stat }) => (
            <div key={stat.name} className="flex justify-between">
              <span className="text-xs font-bold">{capitalize(stat.name)}</span>
              <span className="text-xs font-bold">{base_stat}</span>
            </div>
          ))}
        </div>
    </div>
  );
}
