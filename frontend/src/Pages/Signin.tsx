import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CSS/Signup.css'

const Signin = () => {
  const navigate = useNavigate();
  const navigator = ()=> {
    navigate('/signup')
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2 text-black">Sign in</h2>
        <p className="text-gray-500 mb-6">Enter your email and password to SignIn</p>
        
        <form>
          <div className="mb-4">
            <label className="inputTitle">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="inputBox"
            />
          </div>

          <div className="mb-6">
            <label className="inputTitle">Password</label>
            <input
              type="password"
              placeholder=""
              className="inputBox"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          <a href="#" className="text-black font-medium">Forgot password?</a>
        </p>

        <p className="text-center text-gray-500 text-sm mt-2">
          Don’t have an account? <a onClick={navigator} className="text-black font-medium cursor-pointer">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default Signin