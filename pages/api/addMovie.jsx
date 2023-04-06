import { MongoClient } from "mongodb";

const addMovie = async (req, res) => {
    if (req.method === "POST") {
        const data = req.body;
        const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);
        // TODO: add data to backend

        client.close();
    }
    res.status(201).json({ message: "Movie added!" });
}
export default addMovie