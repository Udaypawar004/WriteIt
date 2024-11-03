import Logo from "/writeIt-Logo.png"
import './CSS/navCont.css'
import { useNavigate } from "react-router-dom"

const NavBar = () => {
    const navigate = useNavigate();

    const signUpNavigation = ()=>{
        navigate('/signup')
    }
    const signInNavigation = ()=>{
        navigate('/signin')
    }
  return (
    <div className='navBar '>
        <div className="section1 background-circle">
            <div className="Logo p-8"><img className='w-12 h-w-12 rounded-full overflow-hidden' src={Logo} alt="" /></div>
            <h2 className='nav-text'>WriteIt</h2>
            <h2 className='nav-text'>About</h2>
        </div>
        <div className="section2 background-circle overflow-hidden">
            <h2 onClick={signInNavigation} className='signin'>SignIn</h2>
            <h2 onClick={signUpNavigation} className='signup'>SignUp</h2>
        </div>
    </div>
  )
}

export default NavBar