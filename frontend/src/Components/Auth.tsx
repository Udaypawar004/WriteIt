import { SignupInput } from '@udaydeshmukh/writeit-common'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'

const Auth = ({type}: {type: "signup" | "signin"}) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: ""
  })

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
      const jwt = response.data;
      console.log(jwt);
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  }
    
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <div className='w-full lg:w-1/2'>
          <div className='flex flex-col justify-center items-center'>
            <div className=''>
                <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-[2.3rem] font-bold'>{type === "signup" ? "Create an account" : "Enter Credentials" }</h1>
            </div>
            <div className='text-lg md:text-xl lg:text-2xl text-[1.3rem] font-semibold text-gray-500'>
                {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                <Link to={type === "signup" ? "/signin" : "/signup"} className='underline hover:opacity-80'>{type === "signup" ? " Sign In" : " Sign Up"}</Link>
            </div>
          </div>
          {type === "signup" ? <InputBox label={"Name"} placeholder={"Joe dow"} onChange={(e)=>{
            setPostInputs({
              ...postInputs,
              name: e.target.value
            })
          }}/> : ""}
          <InputBox label={"Username"} placeholder={"example@gmail.com"} onChange={(e)=>{
            setPostInputs({
              ...postInputs,
              email: e.target.value
            })
          }}/>
          <InputBox label={"Password"} type='password' placeholder={"*********"} onChange={(e)=>{
            setPostInputs({
              ...postInputs,
              password: e.target.value
            })
          }}/>

          <button onClick={sendRequest} className='p-2 rounded-xl w-full mt-8 bg-gray-700 text-white font-bold text-xl font-mono'>{type === "signup" ? "Sign up" : "Sign in"}</button>
        </div>
    </div>
  )
}

interface labelledInput{
  label: string,
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}

export const InputBox = ({ label, placeholder, type, onChange } : labelledInput) => {
  return (
    <div className='mt-5'>
        <label className="block mb-2 text-xl font-medium  text-black">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="border border-gray-300 hover:border-slate-400  p-2 rounded-xl w-full " placeholder={placeholder} required />
    </div>
  )
}



export default Auth