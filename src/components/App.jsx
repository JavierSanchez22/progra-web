import { useState } from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selectPokemon, setSelectPokemon] = useState(null)

  const pokemonPerPage = 20
  const totalPages = Math.ceil(pokemon.length / pokemonPerPage)

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 0))

  const getCurrentPokemons = () => {
    const startIndex = currentPage * pokemonPerPage
    return pokemon.slice(startIndex, startIndex + pokemonPerPage)
  }

  const fetchPokemons = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200')
      const data = await response.json()

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url)
          return await pokemonResponse.json()
        })
      )
      
      setPokemon(pokemonDetails)
    } catch (error) {
      console.error('Error fetching pokemons: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='AppPokemon'>
      <h1>Mi pokedex</h1>
      {loading && <p>Cargando pokemons...</p>}
      <button onClick={fetchPokemons}>Cargar Pokemons</button>
      <p>Pokemons encontrados: {pokemon.length}</p>
      <div className="pokemon-grid">
        {pokemon.map((poke) => (
        <div key={poke.id} className={`pokemon-card ${selectPokemon?.id == poke.id === poke.id ? 'expanded' : ''}`}
          onMouseEnter={() => setSelectPokemon(poke)}
          onMouseLeave={() => setSelectPokemon(null)}>
          <h2>{poke.name}</h2>
          <img src={poke.sprites.front_default} alt={poke.name}/>
          <p>Altura: {poke.height}</p>
          <p>Peso: {poke.weight}</p>
          <p>Tipo: {poke.types.map((type) => type.type.name).join(', ')}</p>
        </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={prevPage} disabled={currentPage === 0}>Prev</button>
        <span>Página {currentPage +1} de {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages - 1}>Next</button>
      </div>
    </div>
  )
}
export default App
