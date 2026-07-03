import React from 'react'
import { useState } from 'react'

import { NavLink } from 'react-router-dom'

import {useNavigate} from "react-router-dom"
import { useAuth } from '../hook/useAuth.js'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Login = () => {
    const [formLoginData,setFormLoginData]=useState({
        emailOrUsername:"",
        password:""
    })
  const {handleLogin}=useAuth() 
const user=useSelector(state=>state.auth.user)
const loading=useSelector(state=>state.auth.loading)
 const navigate=useNavigate()

    function handleChange(e){
    setFormLoginData({
        ...formLoginData,
        [e.target.name]:e.target.value
    })
    }
    
   async function handleSubmit(e){
    e.preventDefault()

// here i am creating dynamically key value acc to 
//     const payload={
//   password:formLoginData.password
// }
// if(formLoginData.emailOrUsername.includes("@")){
//   payload.email=formLoginData.emailOrUsername
// }
// else{
//   payload.username=formLoginData.emailOrUsername
// }

   const success= await handleLogin(formLoginData)
if(success){
    navigate("/")
}

    setFormLoginData({
        emailOrUsername:"",
        password:""
    })

    }
    if(!loading && user){
        return <Navigate to="/" replace/>
    }
  return (
    <main className="min-h-screen flex items-center justify-center bg-black p-6">
        {/* {error&&(<p>{error}</p>)} */}
        <div className="w-full max-w-md bg-neutral-900 rounded-lg shadow-lg shadow-black/60 p-8">
            <h1 className="text-2xl font-semibold mb-6 text-slate-100">login</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input className="w-full px-4 py-2 bg-neutral-800 text-slate-100 border border-slate-800 rounded-md placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-400" type="text" name='emailOrUsername' placeholder='Enter your email/username' value={formLoginData.emailOrUsername} onChange={handleChange} autoComplete='username' />
                <input className="w-full px-4 py-2 bg-neutral-800 text-slate-100 border border-slate-800 rounded-md placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-400" type="password" name='password' placeholder='Enter your password' value={formLoginData.password} onChange={handleChange} autoComplete='password' />
                <button className="w-full bg-[#6D5EF9] text-white py-2 rounded-md hover:bg-[#7B6DFF] transition shadow-sm" type='submit'>Login</button>
            </form>
             <p className="text-sm text-center text-slate-300 mt-4">dont,t have account <NavLink className="text-[#7B6DFF] font-medium" to="/register"><span>Register</span></NavLink></p>
        </div>
    </main>
  )
}

export default Login

