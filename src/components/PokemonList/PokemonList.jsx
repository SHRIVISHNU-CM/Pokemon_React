import './PokemonList.css'
import { useEffect, useState } from 'react';
import Pokemon from '../Pokemon/Pokemon';

import axios from 'axios';

function PokemonList(){
        const default_url = "https://pokeapi.co/api/v2/pokemon"
        const [pokemonList,setPokemonList] = useState([])
        const [pokedexurl, setPodexurl] = useState(default_url)
        const[nexturl,setNexturl] = useState(default_url);
        const[preurl,setPrevurl]= useState(default_url)

        async function downloadPokemon(){
                const response= await axios.get(pokedexurl? pokedexurl:default_url)
                
                const pokemonResults = response.data.results;
                setNexturl(response.data.next);
                setPrevurl(response.data.previous);



                const pokemonPromise = pokemonResults.map((pokemon)=>axios.get( pokemon.url));

                const pokemonListData = await axios.all(pokemonPromise);
                
                const pokemonFinalList = pokemonListData.map(pokemonData=>{
                        const pokemon = pokemonData.data;
                        return{
                                id:pokemon.id,
                                name:pokemon.name,
                                image:pokemon.sprites.other.dream_world.front_default,
                                types:pokemon.types
                        }
                });
                setPokemonList(pokemonFinalList)
                console.log(pokemonFinalList);

        }       
        useEffect(()=>{
             downloadPokemon()
        }, [pokedexurl])
        return(
                <div className ="pokemon-list-wrapper">
                        <div><h1>PokemonList</h1></div>
                        <div className='pageControll'>
                                <button onClick={()=>setPodexurl(preurl)}>Prev</button>
                                <button onClick={()=>setPodexurl(nexturl)}>Next</button>
                        </div>
                        <div className='pokemon-list'>
                                {pokemonList.map(pokemon => <Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image} />)}
                        </div>
                        
                </div>
        )
}

export default PokemonList