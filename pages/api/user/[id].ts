import { collections, connectToDatabase } from '@/lib/database.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc()

// fetch user by user id
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // code to create a new user
    await connectToDatabase()

    // users coll
    const { users } = await collections

    // pull id from req query
    const { id } = req.query

    // fetch user
    const user = await users.findOne({ uid: id })

    // fetch movies based off favorites array
    // todo

    res.json({ user })
  } catch (e) {
    res.json({ message: e.message })
  }
})

// update user by user id
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // code to create a new user
    await connectToDatabase()

    // users coll
    const { users } = await collections

    // pull id from req query
    const { id } = req.query

    // user query
    const query = { uid: id }

    // update user
    const user = await users.updateOne(query, { $set: req.body })

    // return user
    res.json({ user })
  } catch (e) {
    res.json({ message: e.message })
  }
})

export default handler
