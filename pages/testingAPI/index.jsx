// Import the necessary modules
import axios from 'axios';
import { MongoClient } from 'mongodb';
import React from 'react';

// Define the TestingAPI component
function TestingAPI({ movies, favoriteMovies }) {
  // Log the movies and favoriteMovies props
  console.log('movies=', movies)
  console.log('favorite=', favoriteMovies)

  // Define the addMovieHandler function
  const addMovieHandler = async () => {
    // Make a POST request to the "/api/addMovie" endpoint using axios
    const response = await axios.post("/api/addMovie");
    // Extract the "message" property from the response data and log it
    const { message } = response.data;
    console.log(message)
  }

  // Render the component
  return (
    <>
      <h1>HELLO WORLD!</h1>
      <button type="button" onClick={addMovieHandler}>
        test backed for adding featured movies
      </button>
    </>
  );
}

// Define the getStaticProps function
export async function getStaticProps() {
  // Fetch data from the movie API and the MongoDB database in parallel
  const [movieApiResponse, favoriteMoviesResponse] = await Promise.all([
    axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.MOVIEDB_API_KEY}`),
    MongoClient.connect(`${process.env.MONGODB_URI}`)
      .then(client => client.db().collection("movies").find().toArray())
  ]);

  // Extract the movie data from the response and transform it into the desired format
  const movieData = movieApiResponse.data;
  const movies = movieData.results.map((el, idx) => ({
    _id: el.id || idx,
    title: el.name || el.original_title,
    overview: el.overview || '',
    image: `http://image.tmdb.org/t/p/w220_and_h330_face${el.poster_path}`,
    release_date: el.release_date || ''
  }));

  // Extract the favorite movies from the MongoDB response or set it to an empty array
  const favoriteMovies = favoriteMoviesResponse || [];

  // Return the props and revalidation settings
  return { props: { movies, favoriteMovies }, revalidate: 1 };
}

// Export the TestingAPI component as the default export
export default TestingAPI;
