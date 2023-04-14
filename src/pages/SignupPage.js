import React from 'react'
import Banner from '../components/Banner/Banner'
import SignupForm from '../components/SignupForm'
const SignupPage = () => {
  return (
    <>
      <div className="flex flex-row justify-evenly items-center ">
        <Banner />
        <SignupForm />
      </div>


    </>
  )
}

export default SignupPage