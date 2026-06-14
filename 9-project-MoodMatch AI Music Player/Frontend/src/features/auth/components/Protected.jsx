import React from 'react'
import {useAuth} from "../hooks/useAuth"
import {Navigate} from "react-router-dom"
import { useEffect } from 'react'
const Protected = ({children}) => {
    const {user,loading}=useAuth()
    
    console.log(loading)
    console.log(user)
    if(loading){
        return <h1>loading...</h1>
    }
        if(!loading && !user){
            return <Navigate to="/login" />
        }
  return children
}

export default Protected
