import axios from 'axios';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';


interface Movie {
  id: string;
  title: string;
  image: string;
  release_date: string;
  popularity: string;
}

export default async function getMovies(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const movieApiResponse = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.MOVIEDB_API_KEY}`
  );
  const movieData = movieApiResponse.data;

  const data: Movie[] = movieData.results.map((el: any, idx: number) => {
    // Create a date object from the release_date string
    const releaseDate = new Date(el.release_date || el.first_air_date);

    // Format the date as "Month day, year"
    const formattedDate = releaseDate.toLocaleString('default', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });

    // Return a new object with the modified properties
    return {
      _id: new ObjectId(el.id),
      title: el.name || el.original_title,
      overview: el.overview || '',
      image: `http://image.tmdb.org/t/p/w220_and_h330_face${el.poster_path}`,
      release_date: formattedDate,
      popularity: el.popularity.toString(),
      id: el.id || idx,
    };
  });

  res.status(200).json(data);
}
