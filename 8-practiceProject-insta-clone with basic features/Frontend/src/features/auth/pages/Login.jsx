import React, { useState } from 'react'
import "../styles/form.scss"
import { NavLink } from 'react-router-dom'
import axios from "axios"
import {login} from "../services/auth.api"
const Login = ()=>{
const [formLoginData,setFormLoginData]=useState({
  loginId:"",
  password:""
})

function handleChange(e){
setFormLoginData({
  ...formLoginData,
  [e.target.name]:e.target.value
})
}

 async function handleSubmit(e){
e.preventDefault()

const data= await login(formLoginData)
console.log(data)

}


  return (
<main>
    <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} >
            <input type="text" name='loginId' placeholder='Enter your username/Email' onChange={handleChange} />
            <input type="passwords" name="password" placeholder='Enter your password' onChange={handleChange}/>
            <button type='submit'>Login</button>
        </form>
        <p className='toogleAuthForm'>don,t have an account? <NavLink to='/register'><span>Register</span></NavLink></p>
    </div>
</main>
  )
}

export default Login
