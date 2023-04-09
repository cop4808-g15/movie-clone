import {
  collections,
  connectToDatabase,
  disconnectFromDatabase,
} from '@/lib/database.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc()

// create a new user
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  // code to create a new user
  await connectToDatabase()

  // users coll
  const { users } = await collections

  // pull out uid and display name from request body
  const { uid, displayName } = req.body

  // check for existing user
  const existingUser = await users.findOne({ uid })

  // if user exists
  if (existingUser) {
    res.json({ message: 'User exists', existingUser })
    return
  }

  // create new user
  const newUser = await users.insertOne({ uid, displayName })

  res.json({ message: 'Post request', newUser })

  disconnectFromDatabase()
})

export default handler
