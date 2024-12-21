import React from 'react'
import Quote from '../Components/Quote'
import Auth from '../Components/Auth'

const Signin = () => {
  return (
    <div className='h-[100vh] w-full flex justify-center items-center'>
      <div className="w-1/2 h-full">
        <Auth type='signin' />
      </div>
      <div className="bg-gray-100 w-1/2 h-full flex items-center p-[5%] hidden lg:flex">
        <Quote />
      </div>
    </div>
  )
}

export default Signin