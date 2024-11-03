import './CSS/Signup.css'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const  navigate = useNavigate()
  const navigator = () => {
    navigate('/signin')
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2 text-black">Sign up</h2>
        <p className="text-gray-500 mb-6">Create an account to get started</p>
        
        <form>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="inputTitle">First name</label>
              <input
                type="text"
                placeholder="John"
                className="inputBox"
              />
            </div>
            <div className="w-1/2">
              <label className="inputTitle">Last name</label>
              <input
                type="text"
                placeholder="Doe"
                className="inputBox"
              />
            </div>
          </div>

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
            Sign up
          </button>
        </form>
        
        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account? <a onClick={navigator} className="text-black font-medium cursor-pointer">Log in</a>
        </p>
      </div>
    </div>
  )
}

export default Signup