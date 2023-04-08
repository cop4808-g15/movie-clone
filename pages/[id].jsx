import axios from 'axios';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MovieDetails() {
  const router = useRouter()

  const [state, setState] = useState({});

  useEffect(()=>{
    const getMovies = async()=>{
      const {id}= router.query
      const response = await axios.get('/api/getMovies')
      const {data} = response
      const movie = data.filter(m => m.id === Number(id))
      setState(movie[0]);
    }
    
    getMovies().catch(err => err.message)
  }, [router.query.id])
  
  return (
    state && Object.keys(state).length > 0 &&  <div className="bg-white">
      <div className="pb-16 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  {state.name}
                </h1>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">{state.release_date}</p>
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <div className="grid grid-cols-1">
                  <img
                    src={state.image}
                    // alt={image.imageAlt}
                    className="rounded-lg w-full"
                  />
              </div>
            </div>

            <div className="lg:col-span-5">
              <form>
                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center font-bold
                             rounded-md border border-transparent bg-black px-8 py-3
                            text-base text-white hover:bg-gray-700
                            focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  Add favorites
                </button>
              </form>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>

                <div
                  className="prose prose-sm mt-4 text-gray-500"
                  dangerouslySetInnerHTML={{ __html: state.overview }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
