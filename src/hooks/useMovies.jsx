import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previusSearch = useRef(search)

  const getMovies= useCallback( async({search}) =>{
    if (search === previusSearch.current) return
    try {
      setLoading(true)
      setError(null)
      previusSearch.current = search
      const newMovies = await searchMovies({search})
      setMovies(newMovies)
    } catch (e) {
      setError(e.errorMessage)
    } finally {
      setLoading(false)
    }    
  },[])

  const sortedMovies = useMemo(() =>{
    try {
        return sort
              ? [...movies].sort((a,b)=> a.title.localeCompare(b.title))
              : movies
    } catch (e) {
      setError(e.errorMessage)
    } 
  },[sort, movies])

  return { movies: sortedMovies, loading, getMovies, error }

}