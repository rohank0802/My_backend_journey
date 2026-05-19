import React, { useState } from 'react'
import {NavLink, useNavigate} from "react-router-dom"
import axios from "axios"
import {useAuth} from "../hooks/useAuth"
const Register = () => {
 const [registerFormdata,setRegisterFormData]=useState({
  name:"",
  username:"",
  email:"",
  password:""
 })
 const{handleRegister,loading} =useAuth()
 const navigate=useNavigate()

 function handleChange(e){
  setRegisterFormData({
    ...registerFormdata,
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
const res=await handleRegister(registerFormdata)
console.log(res)
navigate("/")
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

               <button className='button primary-button' type='submit'>Register</button>
          </form>
          <p className='toogleAuthForm'>Already have an account? <NavLink className="link" to="/login"><span>Login</span></NavLink></p>
        </div>
      </main>
    </div>
  )
}

export default Register
