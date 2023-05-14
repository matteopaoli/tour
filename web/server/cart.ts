import { ObjectId } from "mongodb"
import { connectToDatabase } from "../lib/mongodb"
import { CartItem, CartSession } from "../types"

export async function createCartSession(userId: string, items: CartItem[]): Promise<void> {
  if (!userId || !items) {
    throw new Error('Invalid input')
  }

  const newSession: CartSession = {
    userId,
    items,
    createdAt: new Date(),
    modifiedAt: new Date(),
  }

  try {
    const db = await connectToDatabase()
    const sessionCollection = db.collection<CartSession>('cartSessions')
    const sessionInsertion = await sessionCollection.insertOne(newSession)

    if (!sessionInsertion.acknowledged) {
      throw new Error('Session insertion failed')
    }
  } catch (error) {
    // Log the error and rethrow it
    console.error(error)
    throw error
  }
}

export async function getCartSessionById(id: string): Promise<CartSession> {
  try {
    const db = await connectToDatabase()
    const cartSessionsCollection = db.collection<CartSession>('cartSessions')
    const session = await cartSessionsCollection.findOne({ _id: new ObjectId(id) })

    if (!session) {
      throw new Error(`Cart session with ID ${id} not found`)
    }

    return session
  } catch (error) {
    // Log the error and rethrow it
    console.error(error)
    throw error
  }
}

export async function updateCartSession(id: string, items: CartItem[]): Promise<void> {
  try {
    const db = await connectToDatabase()
    const cartSessionsCollection = db.collection<CartSession>('cartSessions')
    const session = await cartSessionsCollection.findOne({ _id: new ObjectId(id) })

    if (!session) {
      throw new Error(`Cart session with ID ${id} not found`)
    }

    const updateResult = await cartSessionsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { items, modifiedAt: new Date() } }
    )

    if (!updateResult.acknowledged) {
      throw new Error('Cart session update failed')
    }
  } catch (error) {
    // Log the error and rethrow it
    console.error(error)
    throw error
  }
}

export async function deleteCartSessionById(id: string): Promise<void> {
  try {
    const db = await connectToDatabase()
    const cartSessionsCollection = db.collection<CartSession>('cartSessions')
    const session = await cartSessionsCollection.findOne({ _id: new ObjectId(id) })

    if (!session) {
      throw new Error(`Cart session with ID ${id} not found`)
    }

    const deleteResult = await cartSessionsCollection.deleteOne({ _id: new ObjectId(id) })

    if (!deleteResult.acknowledged) {
      throw new Error('Cart session deletion failed')
    }
  } catch (error) {
    // Log the error and rethrow it
    console.error(error)
    throw error
  }
}