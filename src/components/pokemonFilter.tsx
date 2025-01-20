'use client';  

import { usePokemonContext } from '@/context/pokemonContext';  
import React, { MouseEvent, useState } from 'react';  
import { PokemonAbility, PokemonType } from '../app/lib/utils';  

interface DropdownProps {  
  label: string;  
  options: any[];  
  selected: string | null;  
  onSelect: (option: any) => void;  
}  

const CustomDropdown: React.FC<DropdownProps> = ({ label, options, selected, onSelect }) => {  
  const [isOpen, setIsOpen] = useState(false);  

  const handleSelect = (option: string) => {  
    onSelect(option);  
    setIsOpen(false);  
  };  

  return (  
    <div className="relative mb-2 border border-pokemonBlue">  
      <button  
        onClick={() => setIsOpen(!isOpen)}  
        className="flex justify-between items-center w-full border border-gray-300 rounded-md p-2 bg-white"  
      >  
        {selected || label}  
        <span className="ml-2">▼</span>  
      </button>  
      {isOpen && (  
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">  
          {options.map((option) => (  
            <li  
              key={option}  
              onClick={() => handleSelect(option)}  
              className="p-2 hover:bg-gray-100 cursor-pointer"  
            >  
              {option}  
            </li>  
          ))}  
        </ul>  
      )}  
    </div>  
  );  
};  

const PokemonFilter: React.FC = () => {  
  const { filterPokemon, resetPokemon } = usePokemonContext();  

  const [selectedType, setSelectedType] = useState<string | null>(null);  
  const [selectedAbility, setSelectedAbility] = useState<string | null>(null);  
  const [selectedHeights, setSelectedHeights] = useState<string[]>([]);  
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);  

  const filterPokemons = () => {  
    console.log(selectedType, selectedAbility, selectedHeights, selectedWeights);  
    filterPokemon(  
      selectedType || '',   
      selectedAbility || '',   
      selectedHeights,   
      selectedWeights  
    );  
  };  

  function resetFilters(e: MouseEvent<HTMLButtonElement>): void {  
    setSelectedType(null);  
    setSelectedAbility(null);  
    setSelectedHeights([]);  
    setSelectedWeights([]);  
    resetPokemon();  
  }  

  function handleHeightChange(height: string): void {  
    setSelectedHeights((prev: string[]) =>  
      prev.includes(height)  
      ? prev.filter(h => h !== height)  
      : [...prev, height]  
    );  
  }  

  function handleWeightChange(weight: string) {  
    setSelectedWeights((prev: string[]) =>  
      prev.includes(weight)  
      ? prev.filter(w => w !== weight)  
      : [...prev, weight]  
    );  
  }  

  return (  
    <div className="bg-white rounded-lg p-4 sm:text-sm md:text-sm">  
      <div className="mb-2 text-gray-900">  
        <label htmlFor="type">Type:</label>  
        <CustomDropdown  
          label="Select a type"  
          options={Object.values(PokemonType)}  
          selected={selectedType}  
          onSelect={setSelectedType}  
        />  
      </div>  
      <div className="mb-2 text-gray-900">  
        <label htmlFor="ability">Ability:</label>  
        <CustomDropdown  
          label="Select an ability"  
          options={Object.values(PokemonAbility)}  
          selected={selectedAbility}  
          onSelect={setSelectedAbility}  
        />  
      </div>  

      <div>  
        <h3 className="mb-4 font-semibold text-gray-900">Height</h3>  
        <ul className="w-48 text-sm font-medium text-gray-900 rounded-lg">  
          {['Small', 'Medium', 'Large'].map(height => (  
            <li key={height} className="w-full">  
              <div className="flex items-center ps-3">  
                <input  
                  id={`${height.toLowerCase()}-checkbox`}  
                  type="checkbox"  
                  checked={selectedHeights.includes(height)}  
                  onChange={() => handleHeightChange(height)}  
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"  
                />  
                <label  
                  htmlFor={`${height.toLowerCase()}-checkbox`}  
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900"  
                >  
                  {height}  
                </label>  
              </div>  
            </li>  
          ))}  
        </ul>  
        <h3 className="mb-4 font-semibold text-gray-900">Weight</h3>  
        <ul className="w-48 text-sm font-medium text-gray-900 rounded-lg ">  
          {['Light', 'Middle', 'Heavy'].map(weight => (  
            <li key={weight} className="w-full">  
              <div className="flex items-center ps-3">  
                <input  
                  id={`${weight.toLowerCase()}-checkbox`}  
                  type="checkbox"  
                  checked={selectedWeights.includes(weight)}  
                  onChange={() => handleWeightChange(weight)}  
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"  
                />  
                <label  
                  htmlFor={`${weight.toLowerCase()}-checkbox`}  
                  className="w-full py-3 ms-2 text-sm font-medium"  
                >  
                  {weight}  
                </label>  
              </div>  
            </li>  
          ))}  
        </ul>  
      </div>  
      <div className="flex justify-between mt-4">  
        <button className="text-pokemonBlue mr-2 hover:bg-pokemonYellow" onClick={filterPokemons}>Apply</button>  
        <button className="text-pokemonBlue hover:bg-pokemonYellow" onClick={resetFilters}>Reset</button>  
      </div>  
    </div>  
  );  
};  

export default PokemonFilter;