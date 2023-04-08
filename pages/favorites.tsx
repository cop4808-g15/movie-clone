import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Movie {
  id: string;
  title: string;
  image: string;
  release_date: string;
  popularity: string;
}

export default function Favorites(): JSX.Element { 
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const grabFavorites = async () => {
      const response = await axios.get(`/api/getFeaturedMovies`)
      setMovies(response.data)
    }
    grabFavorites().catch((err) => err.message)
  }, [])

  const removeMovie = useCallback(async (movie: Movie) => {
    try {
      await axios.delete(`/api/removeMovie`, {data: movie})
      setMovies(prevMovies => prevMovies.filter(m => m.id !== movie.id));
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <ul className="px-3 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-7 xl:gap-x-8">
    {movies.map((movie) => (
      <div key={movie.id + uuidv4()}>
        <li className="relative">
          <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <img
              src={movie.image}
              alt=""
              className="pointer-events-none object-cover group-hover:opacity-75"
            />
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for {movie.title}</span>
            </button>
          </div>
          <p className="text-center pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
            {movie.title}
          </p>
          <p className="text-center pointer-events-none block text-sm font-medium text-gray-600">
            {movie.release_date}
          </p>
          <p className="text-center pointer-events-none block text-sm font-medium text-gray-400">
            {movie.popularity}
          </p>
        </li>
        <button
          className="bg-[rgb(31,41,55)] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full content-center"
          type="button"
          onClick={() => removeMovie(movie)}
        >
          Remove
        </button>
      </div>
    ))}
  </ul>
  )
}
