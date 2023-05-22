import { useEffect, useState, useRef } from "react"

export function useSearch(){
  const [search, updateSearch]= useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  
  useEffect(() =>{
    if(isFirstInput.current){
      isFirstInput.current= search === ''
      return
    }

    if(search=== ''){
      setError('No se puede buscar película vacía')
      return
    }
    if(search.length < 0){
      setError('La busqueda es mínima de 3 caracteres')
      return
    }
    if(search.match(/^\d+$/)){
      setError('No se puede buscar películas con ún numero')
      return
    }
    setError(null)
  },[search])

  return {search, updateSearch, error}

}