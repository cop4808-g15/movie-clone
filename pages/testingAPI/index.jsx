import axios from 'axios';
import { useEffect, useState } from 'react';

function TestingAPI() {
    const [movies, setMovies] = useState([])
    
    useEffect( () => {
        const apiCall = async() =>{
            const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=70184d4cf9efbb553ccc3b24b8b2f10b`)
            const arr = []
            const data = response.data.results
            const imgLink = "http://image.tmdb.org/t/p/w220_and_h330_face"
            
            console.log(data);
            data.forEach((el, idx) => {
                const movie = {
                    id: el.id || idx,
                    name: el.name || el.original_title,
                    overview: el.overview || '',
                    img: `${imgLink}${el.poster_path}`,
                    release_date: el.release_date || ''
                }
                arr.push(movie)
            })
            setMovies(arr)
        }
        apiCall()
        console.log(movies)
    }, [])

    const addMovieHandler = async () => {
        const response = await axios.get("/api/addMovie");
        const { data } = response
        console.log(data)
    }

    return (
        <>
            <h1>HELLO WORLD!</h1>
            <button type="button" onClick={addMovieHandler}>
                test backed for featured movies
            </button>
        </>
    );
}

// use this if we want our server to refresh this page each time our backend gets a request.

// export async function getStaticProps() {
//   const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);
//   const db = client.db();
//   client.close();

//   return {
//     props: {},
//     revalidate: 1,
//   };
// }

export default TestingAPI;