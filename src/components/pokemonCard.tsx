import { PokemonResource } from '@/context/pokemonContext';
import React from 'react';
import { useState } from 'react';

interface PokemonCardProps {  
  name?: string;  
  image?: string;  
  types?: string[]; 
  pokemon?: PokemonResource; 
  id:number
}

const PokemonCard:React.FC<PokemonCardProps> = ({ name = 'Unknown', image = '', types = [], pokemon = {} as PokemonResource }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);


  const openModal = () => {   
    setIsModalOpen(true);  
  };  
  const closeModal = () => setIsModalOpen(false);
  const typeColors: { [key: string]: string } = {
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-500',
    default: 'bg-gray-200',
    poison: 'bg-red-300',
    flying: 'bg-blue-200',
    bug: 'bg-gray-400',
    normal: 'bg-yellow-400',
    ground: 'bg-gray-500',
    fairy: 'bg-purple-500',
    fighting: 'bg-orange-500'
  };

  return (
    <>
      {/* Pokemon Card Div */}
      <div
        onClick={openModal}
        className="flex flex-col items-center bg-white rounded-md shadow-md border border-pokemonBlue cursor-pointer hover:scale-105 transition-transform md:w-full"
      >
        <img src={image} alt={name} className="w-20 h-20 rounded-full" />
        <h2 className="text-lg font-bold text-gray-900">{name}</h2>
        <p className='text-gray-500'>#{pokemon.id}</p>
        <div className="flex mb-1">
          {Array.isArray(types) && types.map((type: string, index) => (
            <span
              key={`${type}-${index}`}
              className={`rounded-xl mr-2 p-1 text-white text-xs ${typeColors[type.toLowerCase()] || typeColors.default}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Modal here */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-96 p-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal  
          >
            <div className="flex justify-between items-center">
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <img src={image} alt={name} className="w-32 h-32 rounded-full" />
            </div>
            <h2 className="text-xl font-bold text-gray-700 text-center">{name}</h2>
            <h3 className="text-sm font-bold text-gray-700 text-center mb-4">#{pokemon.id}</h3>
            <div className="flex justify-center mb-2">
              {Array.isArray(types) && types.map((type: string, index) => (
                <span
                  key={`${type}-${index}`}
                  className={`rounded-xl mr-2 p-1 text-white text-xs ${typeColors[type.toLowerCase()] || typeColors.default} text-center w-20`}
                >
                  {type}
                </span>
              ))}
            </div>

            {/* Ability area */}
            <div className="flex flex-col items-center flex-1 text-xs text-black mb-4">
              <p className="mb-1">ABILITIES</p>
              <div className="flex flex-wrap justify-center w-full mt-2">
                {Array.isArray(pokemon.ability) &&
                  pokemon.ability.map((ability, index) => (
                    <span
                      key={`${ability}-${index}`}
                      className="rounded-xl px-2 py-1 text-xs bg-gray-200 mx-1 text-center w-40"
                      style={{ maxWidth: '80%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {ability}
                    </span>
                  ))}
              </div>
            </div>

            {/* Size area, height and weight */}
            <div className="flex items-center justify-between mb-3 text-xs text-black">
              <div className="flex flex-col items-center flex-1">
                <p className='mb-1'>HEIGHT</p>
                <div className="bg-gray-200 rounded-lg text-center w-40 py-1">
                  {pokemon.height / 10} m
                </div>
              </div>
              <div className="flex flex-col items-center flex-1 ml-2">
                <p className='mb-1'>WEIGHT</p>
                <div className="bg-gray-200 rounded-xl text-center w-40 py-1">
                  {pokemon.weight / 10} kg
                </div>
              </div>
            </div>

            {/* Stats area */}
            <p className='text-center text-black text-xs mb-1'>STATS</p>
            <div className="flex items-center justify-between mb-3 text-xs">
              <p className='rounded-xl bg-gray-200'><span className='inline-block rounded-xl bg-red-600 px-2 py-1 mb-1 text-center'>HP</span><span className='block  text-gray-800 text-center'>{pokemon.stats.hp}</span></p>
              <p className='rounded-xl bg-gray-200'><span className='inline-block rounded-xl bg-orange-500 px-2 py-1 mb-1 text-center'>ATK</span><span className='block text-gray-800 text-center'>{pokemon.stats.attack}</span></p>
              <p className='rounded-xl bg-gray-200'><span className='inline-block rounded-xl bg-yellow-400 px-2 py-1 mb-1 text-center'>DFS</span><span className='block text-gray-800 text-center'>{pokemon.stats.defense}</span></p>
              <p className='rounded-xl bg-gray-200'><span className='inline-block rounded-xl bg-blue-400 px-2 py-1 mb-1 text-center'>SpA</span><span className='block  text-gray-800 text-center'>{pokemon.stats.specialAttack}</span></p>
              <p className='rounded-xl bg-gray-200'><span className='inline-block rounded-xl bg-green-500 px-2 py-1 mb-1 text-center'>SpD</span><span className='block  text-gray-800 text-center'>{pokemon.stats.specialDefense}</span></p>
              <p className='rounded-xl bg-gray-200'><span className='inline-block rounded-xl bg-red-300 px-2 py-1 mb-1 text-center'>SPD</span><span className='block text-gray-800 text-center'>{pokemon.stats.speed}</span></p>
            </div>


            {/* Evolution area */}
            <p className="text-center text-black text-xs mb-1">EVOLUTION</p>  
<div className="flex items-center justify-center mb-3 text-xs">  
  { pokemon.evolutionChain && pokemon.evolutionChain.map((stage, index) => (  
    <React.Fragment key={index}>  
      <div className="flex flex-col items-center mx-4">  
        <button  
          onClick={() => openModal()} // Pass the clicked Pokémon to openModal  
          className="focus:outline-none"  
        >  
          <img  
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${stage.id}.png`}  
            alt={stage.name}  
            className="w-20 h-20 rounded-full"  
          />  
        </button>  
        <p className="mt-1 text-center text-black text-xs">{stage.name}</p>  
      </div>  
      {/* Render arrow only if it's not the last stage */}  
      {pokemon.evolutionChain && index < pokemon.evolutionChain.length - 1 && (  
        <img  
          width="16"  
          height="16"  
          src="https://img.icons8.com/small/16/arrow.png"  
          alt="arrow"  
          className="mx-2"  
        />  
      )}  
    </React.Fragment>  
  ))}  
</div>  

          </div>
        </div>
      )}
    </>
  );
};

export default PokemonCard;