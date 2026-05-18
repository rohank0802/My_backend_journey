import React, { useState } from 'react'
import {NavLink} from "react-router-dom"
import axios from "axios"
import {registerController} from "../services/auth.api"
const Register = () => {
 const [registerFormdata,setRegisterFormData]=useState({
  name:"",
  username:"",
  email:"",
  password:""
 })
 function handleChange(e){
  setRegisterFormData({
    ...registerFormdata,
    [e.target.name]:e.target.value
  })
 }

 async function handleSubmit(e){
e.preventDefault()
const data=await registerController(registerFormdata)
console.log(data)
 }


  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter you name' name='name' required onChange={handleChange}/>
               <input type="text" placeholder='Enter you username' name='username' required onChange={handleChange}/>
               <input type="text" placeholder='Enter you Email' name='email' required onChange={handleChange}/>
               <input type="password" placeholder='Enter you Password' name='password' required onChange={handleChange}/> 

               <button type='submit'>Register</button>
          </form>
          <p className='toogleAuthForm'>Already have an account? <NavLink className="link" to="/"><span>Login</span></NavLink></p>
        </div>
      </main>
    </div>
  )
}

export default Register
