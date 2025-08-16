import { useState } from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState([])

  const fetchPokemons = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      const data = await response.json()

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url)
          const pokemonData = await pokemonResponse.json()
          console.log('Pokemon Name: ', pokemonData.name)
          return pokemonData
        })
      )
      
      setPokemon(pokemonDetails)
    } catch (error) {
      console.error('Error fetching pokemons: ', error)
    }
  }

  return (
    <div className='AppPokemon'>
      <h1>Mi pokedex</h1>
      <button onClick={fetchPokemons}>Cargar Pokemons</button>
      <p>Pokemons encontrados: {pokemon.length}</p>
      <div className="pokemon-grid">
        {pokemon.map((poke) => (
        <div key={poke.name} className='pokemon-card'>
          <h2>{poke.name}</h2>
          <img src={poke.sprites.front_default} alt={poke.name}/>
          <p>Altura: {poke.height}</p>
          <p>Peso: {poke.weight}</p>
          <p>Tipo: {poke.types.map((type) => type.type.name).join(', ')}</p>
        </div>
        ))}
      </div>
    </div>
  )
}
export default App
