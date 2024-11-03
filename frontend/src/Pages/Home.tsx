import NavBar from "./NavBar"
import "./CSS/home.css"
import illustration from '/mainIllustration.svg'
import { Link, useNavigate } from "react-router-dom"

const Home = () => {
  const navigation = useNavigate();
  function onChangeHandler() {
    console.log("Implementing")
  }

  return (
    <div>
        <NavBar />

        <div className='HomeContainer'>
          <div className='Headings'>  
            <div className='text-[8rem] text-black font-semibold'>Write It</div>
            <div className='text-[3rem] text-gray-700 font-medium pl-5'>Where Ideas, <br /> Find Words.</div>
          </div>
          <div className='illustrations flex items-center justify-center overflow-hidden'><img className="w-[50rem] h-auto" src={illustration} alt="" /></div>
        </div>
    </div>
  )
}

export default Home