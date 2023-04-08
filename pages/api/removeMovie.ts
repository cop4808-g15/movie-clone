import { MongoClient, MongoClientOptions } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

interface MyMongoClientOptions extends MongoClientOptions {
  useNewUrlParser: boolean;
}

export default async function getFeaturedHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body;
    const client = await MongoClient.connect(process.env.TEST_URL, {
      useNewUrlParser: true,
    } as MyMongoClientOptions);

    const db = client.db('myMovies');
    const movieCollection = db.collection('moviesCollection');
    await movieCollection.deleteOne({  id: data.id });
    await client.close();

    res.status(201).json({ message: 'movie deleted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting movie!' });
  }
}
