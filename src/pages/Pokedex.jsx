import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ListPokemons from '../components/ListPokemons'
import { paginationLogic } from '../helpers/paginationLogic'
import "./styles/Pokedex.css"

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([])
  const [pokemonsFilter, setPokemonsFilter] = useState([])
  const [types, setTypes] = useState([])
  const [namePokemon, setNamePokemon] = useState("")
  const [pokemonType, setPokemonType] = useState("")



const [currentPage, setCurrentPage] = useState(1)

const nameTrainer = useSelector(state => state.nameTrainer)

const handleSubmit = (e) =>{
  e.preventDefault()
  const name = e.target.namePokemon.value
  setNamePokemon(name)
}

const handleChangeSelect = (e) =>{
  setPokemonType(e.target.value)
}
const {lastPage, pagesInBlock, pokemonsInPage} = paginationLogic(currentPage, pokemonsFilter)
const handleClickPage = (newPage) => {
  setCurrentPage(newPage)
}

useEffect(() => {
const URL = `https://pokeapi.co/api/v2/${pokemonType ? `type/${pokemonType}/` : "pokemon/?limit=100"}`
axios.get(URL)
.then(res => {
  if(pokemonType){
const newPokemons = res.data.pokemon.map(pokemon => pokemon.pokemon)
setPokemons(newPokemons)
  }else{
    setPokemons(res.data.results)
  }
})
.catch(err => console.log(err))
}, [pokemonType])

useEffect(() => {
  const URL = "https://pokeapi.co/api/v2/type/"
  axios.get(URL)
  .then(res => setTypes(res.data.results))
  .catch(err => console.log(err))
}, [])

useEffect(() => {
const newPokemons = pokemons.filter(pokemon => pokemon.name.includes(namePokemon)) 
setPokemonsFilter(newPokemons)
}, [namePokemon, pokemons])




  return (
    <main>
      <div>
        <p className='pokedex__text'>Welcome <span className='pokedex__span'>{nameTrainer}</span>, here you can find your favorite pokemon</p>
      <form onSubmit={handleSubmit} className='pokedex__form'>
        <div className='pokedex__search'>
          <input className='pokedex__input' type="text" id='namePokemon' placeholder='Find a Pokemon...'/>
          <button className='pokemon__button' type='submit'>Search</button>
        </div>
        <select onChange={handleChangeSelect} className='pokedex__select'>
          <option value="">All pokemons</option>
          {
          types.map(type => <option value={type.name} key={type.url}>{type.name}</option>
            )}

        </select>
      </form>
      </div>
      <ListPokemons pokemons={pokemonsInPage}/>

      <ul>
        <li>{"<"}</li>
        {
         pagesInBlock.map(pageInBlock => <li onClick={() => handleClickPage(pageInBlock)} key={pageInBlock}>{pageInBlock}</li>)
        }
        <li>{">"}</li>
      </ul>

    </main>
  )
}

export default Pokedex