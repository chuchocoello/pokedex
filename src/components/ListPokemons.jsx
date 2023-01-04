import React from 'react'
import PokemonCard from './PokemonCard'
import "./style/ListPokemon.css"

const ListPokemons = ({ pokemons }) => {
    return (
        <section className='listPokemon'>
            {
                pokemons.map((pokemon) => <PokemonCard key={pokemon.url} pokemon={pokemon} />)
            }


        </section>
    )
}

export default ListPokemons