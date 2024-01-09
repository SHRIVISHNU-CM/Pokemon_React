import Search from '../Search/Search';
import PokemonList from '../PokemonList/PokemonList';
import './Pokedex.css'

function Pokedex(){
    return(
        <div className="pokedex-wrapper">
            <h1>POKEDEX</h1>
            <Search/>
            <PokemonList />
        </div >
    )
}

export default Pokedex;