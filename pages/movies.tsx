import { initFirebase } from '@/firebase/firebaseApp'
import httpService from '@/services/httpService'
import { getAuth } from 'firebase/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify'
import * as api from '../services/apiService'

interface Movie {
  id: string
  title: string
  image: string
  release_date: string
  popularity: string
}

function Movies(): JSX.Element {
  // firebase configuration
  initFirebase()
  const auth = getAuth()

  // firebase hooks
  const [user, loading] = useAuthState(auth)
  const [movies, setMovies] = useState<Movie[]>([])

  const getMovies = async () => {
    try {
      const { data } = await api.getMovies()

      setMovies(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  const fetchUser = async () => httpService.get(`/api/user/${user.uid}`)

  const updateUser = async (payload) =>
    httpService.put(`/api/user/${user.uid}`, payload)

  const addMovie = async (movie) => {
    try {
      const { data } = await fetchUser()

      const userFavorites = data.user.favorites ? data.user.favorites : {}

      // if movie is already in favorites
      if (userFavorites[movie.id]) {
        return
      }

      // add new movie into favorites
      const favorites = {
        ...userFavorites,
        [movie.id]: movie,
      }

      // construct request payload
      const payload = { favorites }

      // update user
      await updateUser(payload)

      // display success messsage
      toast.success('Movie successfully added to favorites')
    } catch (e) {
      // display error message
      toast.error(e.message)
    }
  }

  // if user state is loading
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <ul className="px-3 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-7 xl:gap-x-8">
      {movies.map((movie) => (
        <div key={movie.id}>
          <li className="relative">
            <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <img
                src={movie.image}
                alt=""
                className="pointer-events-none object-cover group-hover:opacity-75"
              />
              <Link href={`/${movie.id}`}>
                <button
                  type="button"
                  className="absolute inset-0 focus:outline-none"
                >
                  <span className="sr-only">
                    View details for {movie.title}
                  </span>
                </button>
              </Link>
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
            className="bg-[rgb(31,41,55)] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full content-center"
            type="button"
            onClick={() => addMovie(movie)}
          >
            Add Favorites
          </button>
        </div>
      ))}
    </ul>
  )
}
export default Movies
