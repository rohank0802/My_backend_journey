
import './App.css'
import { useState,useEffect } from 'react'
import axios from "axios"

function App() {
  const [users, setUsers] = useState([])
useEffect(()=>{
axios.get("/api/users").then(response=>{
  
  setUsers(response.data.users)
})
},[])
  return (
  <>
  
  <div>

  <h1>Users</h1>
  <ul>
    {users.map((user)=>{
      return(
        <li key={user.id}>{user.name}</li>
      )
    })}
  </ul>
  </div>
  </>
  )
}

export default App
