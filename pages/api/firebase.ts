// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firebaseAdmin } from '@/firebase/firebaseAdmin'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const appCheckToken = req.headers.authorization

  if (!appCheckToken) {
    res.status(401).json({ message: 'Not authorized' })
  }

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(appCheckToken)
    res.status(200).json({ message: 'Token verified!', token: decodedToken })
  } catch (e) {
    res.status(401).json({ message: e.message })
  }
}
