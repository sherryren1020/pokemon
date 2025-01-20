'use client';  

import { usePokemonContext } from '@/context/pokemonContext';  
import React, { useState } from 'react';  

const PokemonSearch: React.FC = () => {  
  const { searchPokemon } = usePokemonContext();  
  const [inputValue, setInputValue] = useState('');  
  const buttonImg = 'https://img.icons8.com/matisse/50/star-pokemon.png';  

  const handleSearch = () => {  
    console.log("search clicked");  
    searchPokemon(inputValue);  
  };  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    setInputValue(e.target.value);  
  };  

  return (  
    <div className="w-full border p-1 rounded border-pokemonBlue flex items-center">   
      <input  
        type="text"  
        className="flex-grow px-2 py-1 rounded-md w-full text-black"  
        placeholder="Pokemon name or number or type"  
        value={inputValue}  
        onChange={handleInputChange}  
      />  
      <button  
        onClick={handleSearch}  
        className="rounded-r-md p-2"  
      >  
        <img src={buttonImg} className="h-6 w-6 text-pokemonYellow" alt="Search" />  
      </button>  
    </div>  
  );  
};  

export default PokemonSearch;  