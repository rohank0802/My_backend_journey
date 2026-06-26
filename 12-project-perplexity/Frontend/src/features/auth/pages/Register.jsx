import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'


import {useNavigate} from "react-router-dom"
import { useAuth } from '../hook/useAuth'
const Register = () => {
 const [formLoginData,setFormLoginData]=useState({
    username:"",     
    email:"",
         password:""
     })
  const navigate = useNavigate()
  const {handleRegister}=useAuth()
     function handleChange(e){
     setFormLoginData({
         ...formLoginData,
         [e.target.name]:e.target.value
     })
     }
     
     async function handleSubmit(e){
     e.preventDefault()
     
   await handleRegister(formLoginData)
   
    //  setFormLoginData({
    //     username:"",
    //      email:"",
    //      password:""
    //  })
     console.log(formLoginData)
     }
        return (
        <main className="min-h-screen flex items-center justify-center bg-black p-6">
        <div className="w-full max-w-md bg-neutral-900 rounded-lg shadow-lg shadow-black/60 p-8">
        <h1 className="text-2xl font-semibold mb-6 text-slate-100">Register</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
         <input className="w-full px-4 py-2 bg-neutral-800 text-slate-100 border border-slate-800 rounded-md placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-400" type="text" name='username' placeholder='Enter your username' value={formLoginData.username} onChange={handleChange} autoComplete='username'  />

             <input className="w-full px-4 py-2 bg-neutral-800 text-slate-100 border border-slate-800 rounded-md placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-400" type="text" name='email' placeholder='Enter your email' value={formLoginData.email} onChange={handleChange} autoComplete='email' />
             <input className="w-full px-4 py-2 bg-neutral-800 text-slate-100 border border-slate-800 rounded-md placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-400" type="password" name='password' placeholder='Enter your password' value={formLoginData.password} onChange={handleChange} autoComplete='password' />
             <button className="w-full bg-red-700 text-white py-2 rounded-md hover:bg-red-800 transition shadow-sm" type='submit'>Register Now</button>
             </form>
            <p className="text-sm text-center text-slate-300 mt-4">Alredy have an account?: <NavLink className="text-red-300 font-medium" to="/login"><span>Login</span></NavLink></p>
         </div>
     </main>
   )
}

export default Register