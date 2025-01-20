'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Pokedex from 'pokedex-promise-v2';

export interface PokemonResource {
    id: number;
    name: string;
    type: string[];
    ability: string[];
    image: string;
    gif: string;
    moves: string[];
    height: number;
    weight: number;
    stats: PokemonStats;
    evolutionChain: 
        {
            name: string,
            id: string
        }[]
    | null
}

interface PokemonStats {
    hp?: number;
    attack?: number;
    defense?: number;
    specialAttack: number;
    specialDefense?: number;
    speed?: number;
}

interface PokemonData {
    name: string | null;
    id: string | null;
    evolvesTo: PokemonData | null;
}

interface PokemonContextData {
    pokemon: PokemonResource[];
    hasRemain: boolean
    fetchPokemons: () => Promise<void>;
    isLoading: boolean;
    hasMore: boolean;
    searchPokemon: (input: string) => void;
    filterPokemon: (typeInput: string, abilityInput: string, heightInput: string[], weightInput: string[]) => void;
    resetPokemon: () => void;
}

const defaultContextValue: PokemonContextData = {
    pokemon: [],
    fetchPokemons: async () => { },
    hasMore: true,
    isLoading: false,
    searchPokemon: () => { },
    filterPokemon: () => { },
    resetPokemon: () => { },
    hasRemain: true
};

export const PokemonContext = createContext<PokemonContextData>(defaultContextValue);

export const PokemonContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const P = new Pokedex();
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [hasRemain, setHasRemain] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pokemon, setPokemon] = useState<PokemonResource[]>([]);
    const [originalPokemon, setOriginalPokemon] = useState<PokemonResource[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const limit = 28;
    const TOTAL_POKEMON = 1302;

    useEffect(() => {
        fetchPokemons(); // 初始加载 Pokémon  
    }, []);

    async function fetchPokemons() {
        if (isLoading || !hasMore) {
            console.log('Fetch cancelled due to loading or no more items');
            return;
        }

        try {
            setIsLoading(true);
            const data = await P.getPokemonsList({ limit, offset });
            // console.log(P.getEvolutionChainById(2),"e")
            const pokemonArray: PokemonResource[] = await Promise.all(
                data.results.map(async (poke): Promise<PokemonResource> => {
                    const response = await fetch(poke.url);
                    const data = await response.json();
                    // Get stats ready
                    const pokeStats: PokemonStats = {
                        hp: 0,
                        attack: 0,
                        defense: 0,
                        specialAttack: 0,
                        specialDefense: 0,
                        speed: 0
                    };

                    data.stats.forEach((stats: any) => {
                        const baseStat = stats.base_stat;
                        const statName = stats.stat.name as keyof PokemonStats;
                        pokeStats[statName] = baseStat;
                    });
                    // Get species and evolution chains ready
                    const species = await P.getPokemonSpeciesByName(data.name)
                    const evoChainResponse = await fetch(species.evolution_chain.url);
                    const evoChainData = await evoChainResponse.json()


                    function getPokemonId(chain: any){
                        if (!chain) return "";
                        return chain.url?.split('/').filter((x: any) => x).pop();
                    }

                    // const evolutionChain = getPokemonData(evoChainData.chain);

                    const first = {
                        name: evoChainData.chain.species.name,
                        id: getPokemonId(evoChainData.chain.species),
                    }
                    const second = evoChainData.chain?.evolves_to?.length > 0 ? {
                        name: evoChainData.chain.evolves_to[0]?.species.name,
                        id: getPokemonId(evoChainData.chain.evolves_to[0].species)
                    } : "";

                    const third = evoChainData.chain?.evolves_to?.[0]?.evolves_to?.length > 0 ? {
                        name: evoChainData.chain.evolves_to[0]?.evolves_to[0]?.species.name,
                        id: getPokemonId(evoChainData.chain.evolves_to[0]?.evolves_to[0].species)
                    } : "";


                    const evolutionProgress = [first, second, third].filter(stage => stage !== null) as { name: string; id: string }[];

                    console.log(evolutionProgress, "ddddd")
                    return {
                        name: data.name,
                        ability: data.abilities.map((ability: any) => ability.ability.name),
                        id: data.id,
                        type: data.types.map((type: any) => type.type.name),
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
                        gif: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${data.id}.gif`,
                        moves: data.moves.map((move: any) => move.name),
                        height: data.height,
                        weight: data.weight,
                        stats: pokeStats,
                        evolutionChain: evolutionProgress

                    };
                })
            );

            const sortedPokemonArray = pokemonArray.sort((a, b) => a.id - b.id);
            setOriginalPokemon(prev => [...prev, ...sortedPokemonArray]);
            setPokemon(prev => [...prev, ...sortedPokemonArray]);

            setOffset(prev => prev + limit); // 更新 offset  

            if (offset + limit >= TOTAL_POKEMON) {
                setHasMore(false); // 如果没有更多 Pokémon，设置 hasMore 为 false  
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }

    const searchPokemon = (input: string) => {
        if (!input) {
            setPokemon(originalPokemon);
        } else {
            const filteredPokemons = originalPokemon.filter((poke) =>
                poke.name.toLowerCase().includes(input.toLowerCase()) // 忽略大小写  
            );
            setPokemon(filteredPokemons);

            if (filterPokemon.length < 20) {
                setHasRemain(false)
                setHasMore(false)
            }
        }
    };

    const filterPokemon = (typeInput: string, abilityInput: string, heightInput: string[], weightInput: string[]) => {
        const filteredPokemons = originalPokemon.filter((poke) => {
            const typeMatch = !typeInput || poke.type.includes(typeInput);
            const abilityMatch = !abilityInput || poke.ability.includes(abilityInput);
            const heightMatch = heightInput.length === 0 || heightInput.some(height => {
                switch (height) {
                    case 'Small': return poke.height < 7;
                    case 'Medium': return poke.height >= 7 && poke.height < 17;
                    case 'Large': return poke.height >= 17;
                    default: return false;
                }
            });

            const weightMatch = weightInput.length === 0 || weightInput.some(weight => {
                switch (weight) {
                    case 'Light': return poke.weight < 85;
                    case 'Middle': return poke.weight >= 85 && poke.weight < 800;
                    case 'Heavy': return poke.weight >= 800;
                    default: return false;
                }
            });

            return typeMatch && abilityMatch && heightMatch && weightMatch;
        });

        if (filterPokemon.length < 20) {
            setHasRemain(false)
            setHasMore(false)
        }

        setPokemon(filteredPokemons);

    };

    const resetPokemon = () => {
        setPokemon(originalPokemon);
    };

    const contextValue: PokemonContextData = {
        pokemon,
        fetchPokemons,
        hasMore,
        isLoading,
        searchPokemon,
        filterPokemon,
        resetPokemon,
        hasRemain
    };

    return (
        <PokemonContext.Provider value={contextValue}>
            {children}
        </PokemonContext.Provider>
    );
};

// 自定义 Hook  
export const usePokemonContext = () => {
    const context = useContext(PokemonContext);
    if (context === undefined) {
        throw new Error('usePokemonContext must be used within a PokemonContextProvider');
    }
    return context;
};