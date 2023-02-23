// import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React, { FormEvent, useState } from 'react'
import Input from '../components/input'
// import { Trip } from '../types'
// import { getTripById } from './api/trip'
import CartSidebar from '../components/cart-sidebar'
import { When } from 'react-if'
import "react-datepicker/dist/react-datepicker.css"
import DobDatepicker from '../components/dob-datepicker'


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
    <div className="columns mt-5 is-centered">
      <form className="box column is-5" onSubmit={handleSubmit}>
        <div className="columns is-multiline p-5">
          <div className="column is-half">
            <Input value={firstName} label="First Name" onChange={setFirstName} />
          </div>
          <div className="column is-half">
            <Input value={lastName} label="Last Name" onChange={setLastName} />
          </div>
          <div className="column is-half">
            <Input value={email} label="Email" onChange={setEmail} />
          </div>
          <div className="column is-half">
            <label>
              <span className="has-text-weight-bold">Date of birth:</span>
              <DobDatepicker 
                value={dob}
                onChange={setDob} />
            </label>
          </div>
          <div className="column is-half">  
            <Input value={passportNumber} label="Passport Number" onChange={setPassportNumber} />
          </div>
        </div>
          <div className="column">
          <label className="checkbox">
            <input type="checkbox" checked={isCreateAccount} onChange={e => setIsCreateAccount(e.target.checked)} />
              I want to create an account on BusTickets.com
          </label>
          <When condition={isCreateAccount}>
            <div className="columns">
              <div className="column is-half">
                <Input type="password" label='Password' value={password} onChange={setPassword} />
              </div>
              <div className="column is-half">
                <Input type="password" label='Repeat password' value={repeatPassword} onChange={setRepeatPassword} />
              </div>
            </div>
          </When>
          </div>
        <input className='button is-primary' type="submit" value="Submit" />
      </form>
      <CartSidebar />
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

// }

export default Checkout