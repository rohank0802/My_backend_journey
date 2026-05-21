import React, { useEffect, useState } from 'react'
import "../styles/form.scss"
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useAuth } from '../hooks/useAuth'

const Login = ()=>{
const [formLoginData,setFormLoginData]=useState({
  loginId:"",
  password:""
})
const {handleLogin,user,loading}=useAuth()
const navigate=useNavigate()

function handleChange(e){
setFormLoginData({
  ...formLoginData,
  [e.target.name]:e.target.value
})
}
if(loading){
  return(
    <h1>loading...</h1>
  )
}

 async function handleSubmit(e){
e.preventDefault()

const res=await handleLogin(formLoginData)
console.log(res)
navigate("/")

}



  return (
<main>
    <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} >
            <input type="text" name='loginId' placeholder='Enter your username/Email' onChange={handleChange} />
            <input type="passwords" name="password" placeholder='Enter your password' onChange={handleChange}/>
            <button className='button primary-button' type='submit'>Login</button>
        </form>
        <p className='toogleAuthForm'>dont,t have account <NavLink className="link" to="/register"><span>Register</span></NavLink></p>
    </div>
</main>
  )
}

export default Login
