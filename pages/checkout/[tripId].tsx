import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import { getTripById } from '../api/trip'
import CartSidebar from '../../components/cart-sidebar'
import "react-datepicker/dist/react-datepicker.css"
import { motion } from 'framer-motion'
import CheckoutForm from '../../components/checkout-form/'
import { Trip } from '../../types'


interface CheckoutPageProps {
  trip: Trip,
  quantity: number
  total: number
}

const Checkout = ({ trip, quantity, total }: CheckoutPageProps): JSX.Element => {
  return (
    <motion.div
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 300, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
  >
    <div className="columns mt-5 is-centered">
      <div className="column is-6">
        <CheckoutForm />
      </div>
      <CartSidebar trip={trip} quantity={quantity} total={total} />
    </div>
    </motion.div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const tripId = context.query.tripId!.toString()
  const trip = JSON.parse(JSON.stringify(await getTripById(tripId))) as Trip
  const quantity = +context.query.q!.toString()
  return {
    props: {
      trip,
      quantity: context.query.q?.toString(),
      total: trip.price * quantity
    }
  }
}

export default Checkout