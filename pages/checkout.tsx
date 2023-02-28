// import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React, { FormEvent, useState } from 'react'
import Input from '../components/input'
// import { Trip } from '../types'
// import { getTripById } from './api/trip'
import CartSidebar from '../components/cart-sidebar'
import { When } from 'react-if'
import "react-datepicker/dist/react-datepicker.css"
import DobDatepicker from '../components/dob-datepicker'
import { motion } from 'framer-motion'
import CheckoutForm from '../components/checkout-form/'

// interface CheckoutProps {
//   trip: Trip
// }

const Checkout = () => {
  // Declare state variables and set their initial values
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState<Date | null>(new Date)
  const [passportNumber, setPassportNumber] = useState('')
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

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