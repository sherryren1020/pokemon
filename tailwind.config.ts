import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {  
        'normal': '#A8A878',  
        'fighting': '#C03028',  
        'flying': '#A890F0',  
        'poison': '#A040A0',  
        'ground': '#E0C068',  
        'rock': '#B8A038',  
        'bug': '#A8B820',  
        'ghost': '#705898',  
        'steel': '#B8B8D0',  
        'fire': '#EE8130',  
        'water': '#6890F0',  
        'grass': '#78C850',  
        'electric': '#F8D030',  
        'psychic': '#F85888',  
        'ice': '#98D8D8',  
        'dragon': '#7038F8',  
        'dark': '#705848',  
        'fairy': '#EE99AC',  
        'stellar': '#D3BADA',  
        'shadow': '#505050' ,
        'pokemonBlue':'#0075BE',
        'pokemonYellow':'0075BE'
      },
      fontFamily: {  
        roboto: ['var(--font-roboto)'],  
        jersey: ['var(--font-jersey-15)'],  
      },  
    },
  },
  plugins: [],
} satisfies Config;
