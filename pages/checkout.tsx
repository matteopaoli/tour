import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import React, { FormEvent, useState } from 'react'
import Input from '../components/input'
import img from '../public/sample.png'
import { Trip } from '../types'
import { getTripById } from './api/trip'

interface CheckoutProps {
  trip: Trip
}

const Checkout = ({ trip }: CheckoutProps) => {
  // Declare state variables and set their initial values
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [passportNumber, setPassportNumber] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="columns mt-2">
      <form className="column is-8 control" onSubmit={handleSubmit}>
        <div className="columns is-multiline">
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
            <Input value={dob} label="Date of Birth" onChange={setDob} />
          </div>
          <div className="column is-half">
            <Input value={passportNumber} label="Passport Number" onChange={setPassportNumber} />
          </div>
        </div>
        <input className='button is-primary' type="submit" value="Submit" />
      </form>
      <div className="column is-4">
        <h2 className="is-size-2 has-text-centered">Your details</h2>
        <Image className='image mx-auto' src={img} alt="sample image" />
        <p>From <strong>{trip.points[0].name}</strong> to <strong>{trip.points[1].name}</strong></p>
        <p>Price: {trip.price}</p>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  if (!context.query.id) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  const data = await getTripById(context.query.id.toString())
  const trip: Trip = JSON.parse(JSON.stringify(data)) as Trip

  return {
    props: {
      trip
    }
  }
}

export default Checkout