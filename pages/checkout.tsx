// import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
// import { Trip } from '../types'
// import { getTripById } from './api/trip'
import CartSidebar from '../components/cart-sidebar'
import "react-datepicker/dist/react-datepicker.css"
import { motion } from 'framer-motion'
import CheckoutForm from '../components/checkout-form/'

const Checkout = (): JSX.Element => {
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
      <CartSidebar />
    </div>
    </motion.div>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

// }

export default Checkout