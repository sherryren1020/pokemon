'use client';  

import React from 'react';  
import { usePokemonContext } from '../context/pokemonContext';  
import PokemonCard from './pokemonCard';   

export default function PokemonList() {  
    const { pokemon, fetchPokemons, hasMore, isLoading } = usePokemonContext();  

    return (  
        <div className="flex flex-col items-center"> 
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl'>  
                {pokemon.map((poke) => (  
                    <PokemonCard  
                        name={poke.name}  
                        image={poke.image}  
                        id={poke.id}  
                        types={poke.type}  
                        key={poke.id}  
                        pokemon={poke}  
                    />  
                ))}  

                {isLoading && (  
                    <div className='flex justify-center'>  
                        <p className='text-black'>Loading...</p>  
                    </div>  
                )}  

                {!isLoading && !hasMore && (  
                    <div className='flex justify-center w-full'>  
                        <p className='text-black'>All Pokémon loaded</p>  
                    </div>  
                )}  
            </div>  

            {hasMore && !isLoading && (  
                <div className="flex justify-center mt-4">  
                    <div  
                        className="bg-white rounded-md shadow-md border border-pokemonBlue cursor-pointer hover:scale-105 transition-transform text-black p-2"  
                        onClick={fetchPokemons}  
                    >  
                        Click to load more  
                    </div>  
                </div>  
            )}  
        </div>  
    );  
}