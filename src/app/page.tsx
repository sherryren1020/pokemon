import PokemonCard from "@/components/pokemonCard";
import PokemonFilter from "@/components/pokemonFilter";
import PokemonList from "@/components/pokemonList";
import PokemonSeach from "@/components/pokemonSearch";
import { PokemonContextProvider } from "@/context/pokemonContext";

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-white">
      <PokemonContextProvider>
        {/* Header */}
        <header className="mb-8 text-center">
          <a href="https://fontmeme.com/pokemon-font/">
            <img
              src="https://fontmeme.com/permalink/250114/187efe9a23703852ffc83845a6e0fdb1.png"
              alt="pokemon-font"
            />
          </a>
        </header>

        {/* Search Bar */}
        <div className="mb-6">
          <PokemonSeach />
        </div>

        {/* Main Content */}
        <main className="flex flex-row gap-6">
          {/* Filter Section */}
          <div className="w-1/3">
            <PokemonFilter />
          </div>

          {/* Pokemon List Section */}
          <div className="w-2/3">
            <PokemonList />
          </div>
        </main>
      </PokemonContextProvider>
    </div>
  );
}  