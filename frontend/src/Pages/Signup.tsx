import Qoute from '../Components/Quote'
import Auth from '../Components/Auth'

const Signup = () => {
  return (
    <div className='h-[100vh] w-full flex justify-center items-center'>
        <div className="w-1/2 h-full">
            <Auth type='signup' />  
        </div>
        <div className="bg-gray-900 w-1/2 h-full flex items-center p-[5%] hidden lg:flex">
            <Qoute />
        </div>
    </div>
  )
}

export default Signup