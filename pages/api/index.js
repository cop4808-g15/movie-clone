import { getHandler, postHandler } from './handlers'

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getHandler(req, res)
    case 'POST':
      return postHandler(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}