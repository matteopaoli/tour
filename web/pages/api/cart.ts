import { NextApiRequest, NextApiResponse } from 'next'
import { createCartSession, deleteCartSessionById, getCartSessionById, updateCartSession } from '../../server/cart'
import { CartSession } from '../../types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let userId, items, sessionId
    switch (req.method) {
      case 'POST':
        userId = req.body.userId
        items = req.body.items

        if (!userId || !items) {
          return res.status(400).json({ message: 'Invalid input' })
        }

        await createCartSession(userId, items)
        res.status(200).json({ message: 'Cart session created' })
        break
      case 'GET':
        sessionId = req.query.id?.toString()

        if (!sessionId) {
          return res.status(400).json({ message: 'Invalid input' })
        }

        const session: CartSession = await getCartSessionById(sessionId)

        if (!session) {
          return res.status(404).json({ message: 'Cart session not found' })
        }

        res.status(200).json(session)
        break

      case 'PUT':
        sessionId = req.body.id?.toString()
        items = req.body.items

        if (!sessionId || !items) {
          return res.status(400).json({ message: 'Invalid input' })
        }

        const updatedSession = await updateCartSession(sessionId, items)
        res.status(200).json(updatedSession)
        break

      case 'DELETE':
        sessionId = req.query.id?.toString()

        if (!sessionId) {
          return res.status(400).json({ message: 'Invalid input' })
        }

        await deleteCartSessionById(sessionId)
        res.status(200).json({ message: 'Cart session deleted' })
        break

      default:
        res.status(405).json({ message: 'Method not allowed' })
        break
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}