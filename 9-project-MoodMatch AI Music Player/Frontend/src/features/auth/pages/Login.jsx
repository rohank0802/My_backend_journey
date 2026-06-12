import React from 'react'
import { useState } from 'react'
import "../styles/form.scss"
import { NavLink } from 'react-router-dom'
import {useAuth} from "../hooks/useAuth"
import {useNavigate} from "react-router-dom"
const login = () => {
    const [formLoginData,setFormLoginData]=useState({
        loginId:"",
        password:""
    })
    const {loading,handleLogin,user}=useAuth()
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
    const payload={
  password:formLoginData.password
}
if(formLoginData.loginId.includes("@")){
  payload.email=formLoginData.loginId
}
else{
  payload.username=formLoginData.loginId
}
    await handleLogin(payload)
    navigate("/")
    setFormLoginData({
        loginId:"",
        password:""
    })
    }
    
  return (
    <main className="login-page">
        <div className="form-container">
            <h1>login</h1>
            <form  onSubmit={handleSubmit}>
              <input type="text" name='loginId' placeholder='Enter your email/username' value={formLoginData.loginId} onChange={handleChange}  />
                <input type="password" name='password' placeholder='Enter your password' value={formLoginData.password} onChange={handleChange} />
                <button className='registerButton' type='submit'>Login</button>
            </form>
             <p className='toogleAuthForm'>dont,t have account <NavLink className="link" to="/register"><span>Register</span></NavLink></p>
        </div>
    </main>
  )
}

export default login
