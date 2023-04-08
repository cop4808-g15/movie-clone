import { MongoClient, MongoClientOptions } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

interface MyMongoClientOptions extends MongoClientOptions {
  useNewUrlParser: boolean;
}

export default async function getFeaturedHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body
    const client = await MongoClient.connect(process.env.TEST_URL, {
      useNewUrlParser: true,
    } as MyMongoClientOptions);

    const db = client.db('myMovies');
    const movieCollection = db.collection('moviesCollection');

    const existingMovie = await movieCollection.findOne({ id: data.id });
    if (existingMovie) {
      return res.status(200).json({ message: 'movie duplicate' });
    }

    await movieCollection.insertOne(data)
    await client.close();
    
    return res.status(201).json({ message: 'movie added!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error adding movie!' });
  }
}
