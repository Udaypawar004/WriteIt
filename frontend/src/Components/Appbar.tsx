import { Link } from "react-router-dom"
import Avatar from "./Avatar"

const Appbar = ({ isWriting }: { isWriting: boolean }) => {
  return (
    <div className='flex justify-evenly items-center w-full h-14 p-9 px-10 sticky top-0 z-10 shadow-sm border-b border-gray-500 text-2xl font-bold font-mono'>
        <Link to={"/blogs"}>
          <div className='cursor-pointer'>Write It</div>
        </Link>
        <div className="w-1/2 bg-black h-14 p-0"></div>
        <div className='flex gap-2 justify-center items-center text-md'>
        {isWriting ? "" :
         <Link to={"/publish"}>
          <button data-ripple-light="true" className="rounded-2xl bg-slate-800 py-2 px-4 mr-5 border border-transparent text-center text-sm text-gray-200 transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
            Write a Blog
          </button>
        </Link>}
          <Avatar authorName='Uday' size={"big"} /></div>
    </div>
  )
}

export default Appbar