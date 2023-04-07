import { MongoClient } from 'mongodb'

export default async function getFeaturedHandler(req, res){
      try {
        const client = await MongoClient.connect(process.env.TEST_URL, {
          useNewUrlParser: true,
        })
        const db = client.db('myMovies')
        const movieCollection = db.collection('moviesCollection')
        await movieCollection.find().toArray()
        await client.close()
        res.status(201).json({ message: 'movie added!' })
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error adding movie!' })
      }
  }