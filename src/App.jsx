import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies} from './components/Movies'
import { useSearch } from './hooks/useSearch'
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'

function App() {

  const [sort, setSort] = useState(false)
  const {search, updateSearch, error} = useSearch()
  const {movies, loading, getMovies} = useMovies({search, sort}) 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback( 
    debounce(search => { 
        getMovies({search}) 
      },300
    )
    ,[getMovies] 
  )
 
  const handleSubmit=(event) => {
    event.preventDefault()
    getMovies({search})
  }

  const handleChange=(event) => {
    const newQuery = event.target.value
    updateSearch(newQuery)
    debouncedGetMovies(newQuery)
  }

  const handleSort = () => setSort(!sort)
  
  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input  
            style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }} 
            onChange={handleChange} 
            name='query' 
            value={search} 
            placeholder="Avengers, Star Wars, The matrix..."/>
          <input type='checkbox' 
          onChange={handleSort} 
          checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>
      <main> 
        {
          loading
          ? <p>Cargando.....</p>
          :<Movies movies={movies}/>
        } 
      </main>
    </div>
  )
}

export default App
