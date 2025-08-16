import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  const pokemonPerPage = 18
  const totalPages = Math.ceil(pokemon.length / pokemonPerPage)

  useEffect(() => {
    fetchPokemons()
  }, [])

  const fetchPokemons = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      const data = await response.json()

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url)
          const pokemonData = await pokemonResponse.json()
          return pokemonData
        })
      )
      
      setPokemon(pokemonDetails)
    } catch (error) {
      console.error('Error fetching pokemons: ', error)
    } finally {
      setLoading(false)
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const getCurrentPokemons = () => {
    const startIndex = currentPage * pokemonPerPage
    return pokemon.slice(startIndex, startIndex + pokemonPerPage)
  }

  return (
    <div className='AppPokemon'>
      <h1>Pokedex</h1>
      
      {loading ? (
        <div className="loading">Cargando Pokémons...</div>
      ) : (
        <>
          <p className="pokemon-count">Pokemons encontrados: {pokemon.length}</p>
          
          <div className="pokemon-grid">
            {getCurrentPokemons().map((poke) => (
              <div 
                key={poke.id} 
                className={`pokemon-card ${selectedPokemon?.id === poke.id ? 'expanded' : ''}`}
                onMouseEnter={() => setSelectedPokemon(poke)}
                onMouseLeave={() => setSelectedPokemon(null)}
              >
                <div className="card-content">
                  <div className="card-front">
                    <img 
                      src={poke.sprites.other['official-artwork'].front_default || poke.sprites.front_default} 
                      alt={poke.name} 
                      className="pokemon-image"
                    />
                    <h2>{poke.name}</h2>
                    <p className="pokemon-id">#{poke.id.toString().padStart(3, '0')}</p>
                    <div className="types">
                      {poke.types.map((type) => (
                        <span key={type.type.name} className={`type ${type.type.name}`}>
                          {type.type.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="card-back">
                    <img 
                      src={poke.sprites.other['official-artwork'].front_default || poke.sprites.front_default} 
                      alt={poke.name} 
                      className="detail-image"
                    />
                    <div className="stats">
                      <div className="stat-row">
                        <span className="stat-label">Altura:</span>
                        <span className="stat-value">{poke.height / 10}m</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Peso:</span>
                        <span className="stat-value">{poke.weight / 10}kg</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Habilidades:</span>
                        <span className="stat-value">
                          {poke.abilities.map(ab => ab.ability.name).join(', ')}
                        </span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Experiencia:</span>
                        <span className="stat-value">{poke.base_experience} XP</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">HP:</span>
                        <span className="stat-value">{poke.stats[0].base_stat}</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Ataque:</span>
                        <span className="stat-value">{poke.stats[1].base_stat}</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Defensa:</span>
                        <span className="stat-value">{poke.stats[2].base_stat}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="controls">
            <button onClick={prevPage} disabled={currentPage === 0}>
              Anterior
            </button>
            <span>Página {currentPage + 1} de {totalPages}</span>
            <button onClick={nextPage} disabled={currentPage === totalPages - 1}>
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default App
