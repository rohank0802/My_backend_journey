import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "../styles/form.scss"
import  {useAuth} from "../hooks/useAuth"
import {useNavigate} from "react-router-dom"
const register = () => {
 const [formLoginData,setFormLoginData]=useState({
    username:"",     
    email:"",
         password:""
     })
  const navigate = useNavigate()
     const {loading,handleRegister}=useAuth()
     function handleChange(e){
     setFormLoginData({
         ...formLoginData,
         [e.target.name]:e.target.value
     })
     }
     
     function handleSubmit(e){
     e.preventDefault()
     
     handleRegister(formLoginData)
     navigate("/")
     setFormLoginData({
        username:"",
         email:"",
         password:""
     })
     }
   return (
     <main className="login-page">
         <div className="form-container">
             <h1>Register</h1>
             <form  onSubmit={handleSubmit}>
 <input type="text" name='username' placeholder='Enter your username' value={formLoginData.username} onChange={handleChange}  />

               <input type="text" name='email' placeholder='Enter your email' value={formLoginData.email} onChange={handleChange}  />
                 <input type="password" name='password' placeholder='Enter your password' value={formLoginData.password} onChange={handleChange} />
                 <button className='registerButton' type='submit'>Register Now</button>
             </form>
             <p className='toogleAuthForm'>Alredy have an account?: <NavLink className="link" to="/login"><span>Login</span></NavLink></p>
         </div>
     </main>
   )
}

export default register
