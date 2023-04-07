import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Favorites() { 
  const [data, setData] = useState([])
  const category = 'books'
  useEffect(() => {
    const grabFavorites = async () => {
      const response = await axios.get(`/api/getFeaturedMovies`)
      console.log(response.data)
      setData(response.data)
    }
    grabFavorites().catch((err) => err.message)
  }, [])

  return (
    <h1>HELLO</h1>
  )
}
